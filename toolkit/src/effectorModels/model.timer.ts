import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector'
import { Timer } from '../types'
import { toSeconds } from '../date'
import { noop } from '../helpers'
import { createOneStateStore } from './model.oneState'
import { createDbRequest } from '../asyncDbManager/AsyncDbRequest'

type CreateTimerModelSettings = {
  realTime?: boolean
  persistIn?: string
  tick?: number
}

type AsyncTickSource = {
  startTime: number
}

export function createTimerModel(
  time: number | { current: number },
  { realTime, persistIn, tick: tickTime = 1000 }: CreateTimerModelSettings = {}
) {
  const db = persistIn ? createDbRequest<number>(persistIn) : null
  function getTimeValue() {
    return typeof time === 'number' ? time : time.current
  }

  function getTimeLeft(startFrom: number) {
    return getTimeValue() - (Date.now() - startFrom)
  }

  async function initFirstState() {
    initiated.set()
    if (!db) return
    const saved = await db.get()
    if (!saved) return
    const timeLeft = getTimeLeft(saved)
    if (timeLeft <= 0) return db.reset()
    start(saved)
  }

  const initiated = createOneStateStore(false)

  const onFinish = createEvent()
  const start = createEvent<number | void>()
  start.watch((payload) => {
    if (!db) return
    const startFrom = payload ? payload : Date.now()
    db.setSync(startFrom)
  })

  const reset = createEvent()
  sample({
    source: initiated.$is,
    clock: reset,
  }).watch((isInitiated) => {
    if (!isInitiated) return
    onFinish()
    if (db) db.reset().catch()
  })

  const $startTimeStamp = createStore(0)
    .on(start, (_, startFrom) => {
      if (!startFrom) return Date.now()
      return startFrom
    })
    .reset(reset)

  const tick = createEvent()
  const asyncTick = attach({
    source: $startTimeStamp,
    mapParams: (_: void, startTime) => ({ startTime }),
    effect: createEffect(({ startTime }: AsyncTickSource) => {
      if (!startTime) return 0
      return toSeconds(getTimeLeft(startTime))
    }),
  })
  const modelTick = realTime ? asyncTick : tick

  const $timer = createStore(0)
    .on(start, (state, startFrom) => {
      if (!startFrom) return toSeconds(getTimeValue())
      const timeLeft = getTimeLeft(startFrom)
      if (timeLeft > 0) return toSeconds(timeLeft)
      if (!state) return 1
      return 0
    })
    .on(tick, (state) => (state > 0 ? state - 1 : 0))
    .on(asyncTick.done, (state, { result }) => {
      if (result < 0) return 0
      return result
    })
    .reset(reset)

  $timer.watch((state) => {
    if (state <= 0) reset()
  })
  const $state = $timer.map((state) => state > 0)

  createStore<Timer | null>(null)
    .on(start, (state) => {
      if (state) clearInterval(state)
      return setInterval(modelTick, tickTime)
    })
    .on(reset, (state) => {
      if (!state) return
      clearInterval(state)
      return null
    })

  initFirstState().catch(noop)

  return {
    $state,
    $timer,
    start,
    reset,
    onFinish,
  }
}
