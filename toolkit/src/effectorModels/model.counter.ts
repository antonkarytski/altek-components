import { createStore, Effect, Event } from 'effector'
import { FnExt } from '../types'

type AnyEvent<P> = Event<P> | Effect<P, any>
type Filter<P> = FnExt<P, boolean | void>
type Modifier = <T>(event: AnyEvent<T>, filter?: Filter<T>) => CounterModel

class CounterModel {
  public readonly $value = createStore(0)
  public readonly $state = this.$value.map((state) => !!state)

  public readonly inc: Modifier = (event, filter) => {
    this.$value.on(event, (state, payload) => {
      if (!filter || filter(payload)) return state + 1
    })
    return this
  }

  public readonly dec: Modifier = (event, filter) => {
    this.$value.on(event, (state, payload) => {
      if (!filter || filter(payload)) return Math.max(state - 1, 0)
    })
    return this
  }

  public readonly reset = (event: Parameters<typeof this.$value.reset>[0]) => {
    this.$value.reset(event)
    return this
  }
}

export function createCounter() {
  return new CounterModel()
}
