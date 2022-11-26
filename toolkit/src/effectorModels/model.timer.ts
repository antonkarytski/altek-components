import { createEvent, createStore, sample, Store, is } from 'effector'
import { Timer } from '../types'
import { noop } from '../helpers'
import { createOneStateStore } from './model.oneState'
import {
  AsyncDbRequest,
  createDbRequest,
} from '../asyncDbManager/AsyncDbRequest'
import { MutableRefObject } from 'react'

type DbSaveFormat = {
  startFrom: number
  startValue: number
}

type TimerModelProps = {
  persistIn?: string | AsyncDbRequest<DbSaveFormat>
  tick?: number
  defaultTime?: number | { current: number } | Store<number>
  realTime?: boolean
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
    if (persistIn) {
      if (typeof persistIn === 'string') {
        this.db = createDbRequest<DbSaveFormat>(persistIn)
      } else {
        this.db = persistIn
      }
    }
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

export function createTimerModel(props: TimerModelProps) {
  return new TimerModel(props)
}
