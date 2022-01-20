import { createStore, Effect, Event } from 'effector'
import { FnExt } from '../types'

type AnyEvent<P> = Event<P> | Effect<P, any>
type Filter<P> = FnExt<P, boolean | void>

export function createCounter() {
  const $value = createStore(0)
  const $state = $value.map((state) => !!state)

  const counterModel = {
    $value,
    $state,
    inc,
    dec,
    reset: $value.reset,
  }

  function inc<P>(event: AnyEvent<P>, filter?: Filter<P>) {
    $value.on(event, (state, payload) => {
      if (!filter || filter(payload)) return state + 1
    })
    return counterModel
  }

  function dec<P>(event: AnyEvent<P>, filter?: Filter<P>) {
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
