import {
  attach,
  createEffect,
  createEvent,
  createStore,
  Effect,
  Event,
  restore,
  sample,
  Store,
} from 'effector'
import { createCounter } from './model.counter'
import { noop } from '../helpers'
import { OrArray } from '../types'

type WithOptions<Params> = Params & { attempt?: number }

type RepeatableEffectOptions<Params> = {
  /*
   * if passed a number, then there will be equal delay between request.
   * if passed array, then each next attempt will fire with corresponding delay
   * if array if shorter than attempts count, next attempt get last element of array
   */
  delay?: number | number[]
  attemptsCount?: number
  attemptsFilter?: (
    params: WithOptions<Params>,
    error: Error
  ) => boolean | Promise<boolean>
  /*
   * if true task from queue will be fire sequentially
   */
  sequential?: boolean
}

export type RepeatableEffect<Params extends object, Response> = Effect<
  Params & { attempt?: number },
  Response
> & {
  onAttemptsExceed: Event<WithOptions<Params & { error: Error }>>
  withBlock: Effect<Params & { attempt?: number }, Response>
  $inFlightProcess: Store<boolean>
}

export type CreateRepeatableEffectProps<
  Params extends object,
  Response,
  TriggerStore
> = {
  triggerSource: Store<TriggerStore>
  filter?: (cSource: TriggerStore, data?: Params) => boolean
  fn: (params: Params) => Promise<Response>
  options?: RepeatableEffectOptions<Params>
}

function getDelay(delay: OrArray<number> | undefined, attempt: number) {
  if (!delay) return 1000
  if (!Array.isArray(delay)) return delay
  const { length } = delay
  if (attempt - 1 > length) return delay[length - 1]
  return delay[attempt - 2]
}

function addOptions<Params>(
  params: WithOptions<Params> | void
): Params & { attempt: number } {
  if (!params) return { attempt: 1 } as Params & { attempt: number }
  if (!params.attempt) return { ...params, attempt: 1 }
  return { ...params, attempt: params.attempt + 1 }
}

export function createRepeatableEffect<
  Params extends object,
  Response,
  TriggerStore
>({
  triggerSource,
  filter,
  fn,
  options,
}: CreateRepeatableEffectProps<Params, Response, TriggerStore>) {
  const repeatableEffect = createEffect<WithOptions<Params>, Response>(
    fn
  ) as RepeatableEffect<Params, Response>

  const onAttemptExceed = createEvent<WithOptions<Params & { error: Error }>>()
  const inFlight = createCounter()
    .inc(repeatableEffect, ({ attempt }) => !attempt)
    .dec(repeatableEffect.done)
    .dec(onAttemptExceed)

  const $isTriggerStoreOpened = !filter
    ? createStore(true)
    : triggerSource.map((cSource) => {
        return filter(cSource)
      })

  const addTask = createEvent<Params>()
  const clearTasks = createEvent()
  const shiftTask = createEvent()
  const $tasks = createStore<Params[]>([])
    .on(addTask, (state, payload) => [...state, payload])
    .on(shiftTask, (state) => {
      const newTasks = [...state]
      newTasks.shift()
      return newTasks
    })
    .reset(clearTasks)

  const repeat = createEvent<Params>()
  sample({
    source: triggerSource,
    clock: repeat,
    fn: (cSource, data: Params) => ({ cSource, data }),
  }).watch(({ cSource, data }) => {
    if (filter && !filter(cSource, data)) return addTask(data)
    repeatableEffect(data).catch(noop)
  })

  type FirePersistedTasksProps = { fromInside?: boolean }
  const firePersistedTasks = createEvent<FirePersistedTasksProps | void>()
  const setOnResend = createEvent<boolean>()

  const $isOnResend = restore(setOnResend, false)
  sample({
    source: {
      tasks: $tasks,
      isInFlight: inFlight.$state,
      isAbleToFire: $isTriggerStoreOpened,
      isOnResend: $isOnResend,
    },
    clock: firePersistedTasks,
    fn: (source, props) => ({ ...source, props }),
  }).watch(async ({ tasks, isInFlight, isAbleToFire, isOnResend, props }) => {
    if (!isInFlight || !tasks.length) return
    if (options?.sequential) {
      if (!isAbleToFire || !tasks.length) return setOnResend(false)
      if (isOnResend && !(props && props.fromInside)) return
      setOnResend(true)
      repeatableEffect(tasks[0])
        .catch(noop)
        .finally(() => firePersistedTasks({ fromInside: true }))
      return shiftTask()
    }
    tasks.forEach((task) => repeatableEffect(task).catch(noop))
    clearTasks()
  })

  triggerSource.watch((cSource) => {
    if (!filter || filter(cSource)) firePersistedTasks()
  })

  repeatableEffect.fail.watch(async ({ params, error }) => {
    const newParams = addOptions(params)
    if (options?.attemptsCount && newParams.attempt > options.attemptsCount) {
      return onAttemptExceed({ ...newParams, error })
    }
    if (
      options?.attemptsFilter &&
      !(await options.attemptsFilter(newParams, error))
    ) {
      return onAttemptExceed({ ...newParams, error })
    }
    const delay = getDelay(options?.delay, newParams.attempt)
    const timeout = setTimeout(() => {
      repeat(newParams)
      clearTimeout(timeout)
    }, delay)
  })

  const effectWithBlock = attach({
    source: inFlight.$state,
    mapParams: (params: WithOptions<Params>, __inFlight) => ({
      __inFlight,
      ...params,
    }),
    effect: createEffect(
      (params: WithOptions<Params> & { __inFlight: boolean }) => {
        if (params.__inFlight) throw Error('Channel is busy')
        return repeatableEffect(params)
      }
    ),
  }) as RepeatableEffect<Params, Response>

  repeatableEffect.onAttemptsExceed = onAttemptExceed
  repeatableEffect.withBlock = effectWithBlock
  repeatableEffect.$inFlightProcess = inFlight.$state
  return repeatableEffect
}
