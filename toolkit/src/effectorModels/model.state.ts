import { createEvent, restore, Store, Event } from 'effector'

export function createStateModel<T>(initial: T) {
  const set = createEvent<T>()
  const $state = restore(set, initial)
  return { $state, set }
}

export type StateModel<T> = {
  $state: Store<T>
  set: Event<T>
}
