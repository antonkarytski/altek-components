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

type StorePersistPropsDirect<F extends string, S, R = S> = {
  $store: Store<R>
  saveTo: F
  map?: never
}

type StorePersistPropsWithMap<F extends string, S, R> = {
  $store: Store<S>
  saveTo: F
  map: (state: S) => R
}

type StorePersistProps<F extends string, S, R> =
  | StorePersistPropsDirect<F, S, R>
  | StorePersistPropsWithMap<F, S, R>

export class StorePersist<F extends string, S, R> {
  private previousValue: R | null = null
  private _isInitiated = false
  public get isInitiated() {
    return this._isInitiated
  }
  private db

  private init = createEffect(() => {
    if (!this._isInitiated) return this.db.get()
  })

  public readonly onInit = this.init.done
  public readonly resetDb

  constructor({ saveTo, $store, map }: StorePersistProps<F, S, R>) {
    this.db = createDbRequest<R>(saveTo)
    this.resetDb = this.db.reset
    this.init.finally.watch(() => {
      this._isInitiated = true
    })

    if (map) {
      $store.watch((state) => {
        const newValue = map(state)
        if (this.previousValue === newValue) return
        this.previousValue = newValue
        if (this._isInitiated) this.db.setSync(map(state))
      })
      return
    } else {
      $store.watch((state) => {
        if (this.previousValue === state) return
        this.previousValue = state
        if (this._isInitiated) this.db.setSync(state)
      })
    }

    this.init().catch(noop)
  }
}

export function addStorePersist<F extends string, S, R = S>(
  props: StorePersistProps<F, S, R>
) {
  return new StorePersist(props)
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
