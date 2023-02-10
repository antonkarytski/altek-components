import { createEffect, Store } from 'effector'
import { noop } from '../helpers'
import { createDbRequest } from '../asyncDbManager/AsyncDbRequest'

type StorePersistProps<S> = {
  $store: Store<S>
  saveTo: string
  map?: (state: S) => any
}

export class StorePersist<
  P extends StorePersistProps<any>,
  T = P['map'] extends (...p: any[]) => any
    ? ReturnType<P['map']>
    : P['$store'] extends Store<infer S>
    ? S
    : never
> {
  private previousValue: T | null = null
  private _isInitiated = false
  public get isInitiated() {
    return this._isInitiated
  }
  private db
  public readonly resetDb

  private init = createEffect(() => {
    if (!this._isInitiated) return this.db.get()
  })

  public readonly onInit = (watcher: (props: T | undefined) => void) => {
    this.init.done.watch(({ result }) => {
      watcher(result)
    })
  }

  constructor({ saveTo, $store, map }: P) {
    this.db = createDbRequest<T>(saveTo)
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

export function addStorePersist<P extends StorePersistProps<any>>(props: P) {
  return new StorePersist(props)
}
