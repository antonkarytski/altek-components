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

class StorePersist<F extends string, S> {
  private previousStoredValue = undefined
  private readonly setIsInitiated = createEvent()
  public readonly $isInitiated = createStore(false).on(
    this.setIsInitiated,
    () => true
  )

  private readonly db
  private readonly init = attach({
    source: this.$isInitiated,
    mapParams: (_: void, isInitiated) => ({ isInitiated }),
    effect: createEffect(async ({ isInitiated }: { isInitiated: boolean }) => {
      if (!isInitiated) return this.db.get()
    }),
  })

  public readonly onInit = this.init.done.watch
  public readonly resetDb

  constructor($store: Store<S>, saveTo: F) {
    this.db = createDbRequest<S>(saveTo)
    this.resetDb = this.db.reset

    sample({
      source: this.$isInitiated,
      clock: $store,
      fn: (isInitiated, state) => ({ isInitiated, state }),
    }).watch(({ isInitiated, state }) => {
      if (isInitiated) this.db.setSync(state)
    })

    this.init.finally.watch(() => this.setIsInitiated())
    this.init().catch()
  }
}

export function addPersistExperimental<F extends string, S>(
  $store: Store<S>,
  saveTo: F
) {
  return new StorePersist($store, saveTo)
}

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
    resetDb: db.reset,
  }
}
