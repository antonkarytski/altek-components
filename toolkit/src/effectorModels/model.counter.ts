import { createStore, Effect, Event, Store } from 'effector'
import { FnExt } from '../types'

type AnyEvent<P> = Event<P> | Effect<P, any>
type Filter<P> = FnExt<P, boolean | void>

export function createCounter() {
  const $value: Store<number> = createStore(0)
  const $state: Store<boolean> = $value.map((state) => !!state)

  const counterModel = {
    $value,
    $state,
    inc,
    dec,
    reset: $value.reset,
  }

  function inc<I>(event: AnyEvent<I>, filter?: Filter<I>) {
    $value.on(event, (state, payload) => {
      if (!filter || filter(payload)) return state + 1
    })
    return counterModel
  }

  function dec<D>(event: AnyEvent<D>, filter?: Filter<D>) {
    $value.on(event, (state, payload) => {
      if (!filter || filter(payload)) return state > 0 ? state - 1 : 0
    })
    return counterModel
  }

  return {
    $value,
    $state,
    inc,
    dec,
  }
}
