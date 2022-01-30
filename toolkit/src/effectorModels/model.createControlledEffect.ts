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

type WithOptions<Params> = { attempt?: number; props: Params }
type WithErrorOptions<Params> = WithOptions<Params> & { error: Error }

type RepeatableEffectOptions<Params> = {
  /*
	 if passed a number, then there will be equal delay between request.
	 if passed array, then each next attempt will fire with corresponding delay
	 if array if shorter than attempts count, next attempt get last element of array
	 */
  delay?: number | number[]
  /*
	 Count of attempts before onAttemptExceed event fires
	*/
  attemptsCount?: number
  /*
		If return true allow effect to repeat function again, otherwise, stop attempts and fire onAttemptExceed event
	 */
  attemptsFilter?: (
    params: WithOptions<Params>,
    error: Error
  ) => boolean | Promise<boolean>
  /*
   * if true task from queue will be fire sequentially
   */
  sequential?: boolean
}

export type RepeatableEffect<Params, Response> = Effect<Params, Response> & {
  onAttempt: Event<WithOptions<Params>>
  onAttemptsExceed: Event<WithErrorOptions<Params>>
  onCancel: Event<WithOptions<Params>>
  withBlock: Effect<Params, Response>
  withCancelPreviousTask: Effect<Params, Response>
  $inFlightProcess: Store<boolean>
}

export type CreateRepeatableEffectProps<Params, Response, TriggerStore> = {
  triggerSource: Store<TriggerStore>
  filter?: (cSource: TriggerStore, data?: WithOptions<Params>) => boolean
  fn: (params: Params) => Promise<Response>
  options?: RepeatableEffectOptions<Params>
}

function getDelay(delay: OrArray<number> | undefined, attempt: number) {
  if (!delay) return 1000
  if (!Array.isArray(delay)) return delay
  const length = delay.length
  if (attempt - 1 > length) return delay[length - 1]
  return delay[attempt - 2]
}

function addOptions<Params>(params: WithOptions<Params> | void) {
  if (!params) return { attempt: 1, props: (undefined as any) as Params }
  if (!params.attempt) return { props: params.props, attempt: 1 }
  return { props: params.props, attempt: params.attempt + 1 }
}

export function createControlledEffect<Params, Response, TriggerStore>({
  triggerSource,
  filter,
  fn,
  options,
}: CreateRepeatableEffectProps<Params, Response, TriggerStore>) {
  const onAttempt = createEvent<WithOptions<Params>>()
  const onCancel = createEvent<WithOptions<Params>>()
  const onAttemptExceed = createEvent<WithErrorOptions<Params>>()

  const repeatableEffect = createEffect<WithOptions<Params>, Response>(
    ({ props }) => fn(props)
  )

  const repeatableEffectWrapper = createEffect((props: Params) =>
    repeatableEffect({ props })
  ) as RepeatableEffect<Params, Response>

  repeatableEffect.watch((params) => {
    onAttempt(params)
  })

  const inFlight = createCounter()
    .inc(repeatableEffect, ({ attempt }) => !attempt)
    .dec(repeatableEffect.done)
    .dec(onAttemptExceed)
    .dec(onCancel)

  const $isTriggerStoreOpened = !filter
    ? createStore(true)
    : triggerSource.map((cSource) => filter(cSource))

  const addTask = createEvent<WithOptions<Params>>()
  const clearTasks = createEvent()
  const shiftTask = createEvent()
  const $tasks = createStore<WithOptions<Params>[]>([])
    .on(addTask, (state, payload) => [...state, payload])
    .on(shiftTask, (state) => {
      const newTasks = [...state]
      newTasks.shift()
      return newTasks
    })
    .reset(clearTasks)

  const repeat = createEvent<WithOptions<Params>>()
  sample({
    source: triggerSource,
    clock: repeat,
    fn: (cSource, data) => ({ cSource, data }),
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
    mapParams: (props: Params, __inFlight) => ({
      __inFlight,
      props,
    }),
    effect: createEffect(
      ({ props, __inFlight }: { __inFlight: boolean; props: Params }) => {
        if (__inFlight) throw Error('Channel is busy')
        return repeatableEffectWrapper(props)
      }
    ),
  }) as RepeatableEffect<Params, Response>

  const effectWithCancelPreviousTask = attach({
    source: $tasks,
    mapParams: (params: Params, tasks) => ({
      tasks,
      params,
    }),
    effect: createEffect(
      ({ tasks, params }: { tasks: WithOptions<Params>[]; params: Params }) => {
        tasks.forEach(({ props }) => onCancel({ props }))
        clearTasks()
        return repeatableEffectWrapper(params)
      }
    ),
  })

  repeatableEffectWrapper.onAttempt = onAttempt
  repeatableEffectWrapper.onAttemptsExceed = onAttemptExceed
  repeatableEffectWrapper.onCancel = onCancel
  repeatableEffectWrapper.withBlock = effectWithBlock
  repeatableEffectWrapper.withCancelPreviousTask = effectWithCancelPreviousTask
  repeatableEffectWrapper.$inFlightProcess = inFlight.$state
  return repeatableEffectWrapper
}
