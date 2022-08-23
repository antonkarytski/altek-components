import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
  Store,
  is,
} from 'effector'
import { Timer } from '../types'
import { toSeconds } from '../date'
import { noop } from '../helpers'
import { createOneStateStore } from './model.oneState'
import {
  AsyncDbRequest,
  createDbRequest,
} from '../asyncDbManager/AsyncDbRequest'
import { MutableRefObject } from 'react'

type CreateTimerModelSettings = {
  realTime?: boolean
  persistIn?: string
  tick?: number
}

type AsyncTickSource = {
  startTime: number
}

type TimerModelProps = {
  persistIn?: string
  tick?: number
  defaultTime?: number | { current: number } | Store<number>
  realTime?: boolean
}

type DbSaveFormat = {
  startFrom: number
  startValue: number
}

export class TimerModel {
  private readonly tickTime
  private defaultTime = 0
  private defaultTimeProvider = { current: 0 }
  private currentTimerSettings: DbSaveFormat | null = null
  private timer: Timer | null = null

  private readonly db: null | AsyncDbRequest<DbSaveFormat> = null
  private readonly initiated = createOneStateStore(false)

  private readonly startWithDefaultTime = createEvent<number>()
  private readonly tick = createEvent<void | number>()
  private readonly realTick = createEvent()
  private readonly currentTick

  public readonly reset = createEvent()
  public readonly start = createEvent<number | void>()
  public readonly onFinish = createEvent()
  public readonly $timer = createStore(0)
    .on(this.startWithDefaultTime, (_, initialValue) =>
      Math.max(initialValue, 0)
    )
    .on(this.tick, (state, newValue) => {
      if (!newValue) Math.max(0, state - this.tickTime)
      return newValue
    })
    .reset(this.reset)
  public readonly $state = this.$timer.map((state) => state > 0)

  constructor({
    persistIn,
    tick = 1000,
    defaultTime = 0,
    realTime,
  }: TimerModelProps = {}) {
    if (persistIn) this.db = createDbRequest<DbSaveFormat>(persistIn)
    this.tickTime = tick
    this.setUpStartEvent(defaultTime)

    this.startWithDefaultTime.watch((payload) => {
      const settings = {
        startFrom: Date.now(),
        startValue: payload,
      }
      this.startTimer()
      this.currentTimerSettings = settings
      if (this.db) this.db.setSync(settings)
    })

    this.currentTick = realTime ? this.realTick : this.tick
    this.realTick.watch(() => {
      const newValue = this.getTimeLeft()
      this.tick(newValue)
    })

    this.$timer.watch((state) => {
      if (state <= 0) this.reset()
    })

    sample({
      source: this.initiated.$is,
      clock: this.reset,
    }).watch((isInitiated) => {
      if (!isInitiated) return
      this.stopTimer()
      this.onFinish()
      this.currentTimerSettings = null
      this.db?.reset().catch(noop)
    })
    this.initFirstState().catch(noop)
  }

  private startTimer() {
    if (this.timer) clearInterval(this.timer)
    this.timer = setInterval(this.currentTick, this.tickTime)
  }

  private stopTimer() {
    if (!this.timer) return
    clearInterval(this.timer)
    return null
  }

  private setUpStartEvent(defaultTime: TimerModelProps['defaultTime'] = 0) {
    if (is.store(defaultTime)) {
      defaultTime.watch((value) => {
        this.defaultTime = value
      })
      return sample({
        source: defaultTime,
        clock: this.start,
        fn: (defaultTime: number, value) => value ?? defaultTime,
        target: this.startWithDefaultTime,
      })
    }
    if (typeof defaultTime === 'object') {
      this.defaultTimeProvider = defaultTime as MutableRefObject<number>
      return this.start.watch((value) => {
        this.startWithDefaultTime(value ?? this.defaultTimeProvider.current)
      })
    }
    this.start.watch((value) => {
      this.startWithDefaultTime(value ?? defaultTime)
    })
  }

  private getTimeLeft() {
    if (!this.currentTimerSettings) return 0
    return (
      this.currentTimerSettings.startValue -
      (Date.now() - this.currentTimerSettings.startFrom)
    )
  }

  private async initFirstState() {
    this.initiated.set()
    if (!this.db) return
    const saved = await this.db.get()
    if (!saved) return
    this.currentTimerSettings = saved
    const timeLeft = this.getTimeLeft()
    if (timeLeft <= 0) {
      this.currentTimerSettings = null
      return this.db.reset()
    }
    this.start(timeLeft)
  }
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
