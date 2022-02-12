import { createEvent, createStore } from 'effector'

export function createOneStateStore(initial: boolean) {
  const set = createEvent()
  const $is = createStore(initial).on(set, () => !initial)

  return { $is, set }
}
