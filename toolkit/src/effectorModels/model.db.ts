import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
  Store,
} from 'effector'
import { noop } from '../helpers'
import { createDbRequest } from '../asyncDbManager/AsyncDbRequest'

export function addPersist<F extends string, S>($store: Store<S>, saveTo: F) {
  const setInitiated = createEvent()
  const $isInitiated = createStore(false).on(setInitiated, () => true)
  const db = createDbRequest<S>(saveTo)

  sample({
    source: $isInitiated,
    clock: $store,
    fn: (isInitiated, state) => ({ isInitiated, state }),
  }).watch(({ isInitiated, state }) => {
    if (isInitiated) db.setSync(state)
  })

  const init = attach({
    source: $isInitiated,
    mapParams: (_: void, isInitiated) => ({ isInitiated }),
    effect: createEffect(async ({ isInitiated }: { isInitiated: boolean }) => {
      if (!isInitiated) return db.get()
    }),
  })

  init.finally.watch(() => setInitiated())
  init().catch(noop)

  return {
    onInit: init.done.watch,
    resetDb: db.reset
  }
}
