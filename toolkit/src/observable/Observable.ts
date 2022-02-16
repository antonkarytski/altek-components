type Watcher<T> = (value: T) => void

export class Observable<T> {
  private _currentValue
  public get currentValue() {
    return this._currentValue
  }
  private readonly watchers: Watcher<T>[] = []

  constructor(initialValue: T) {
    this._currentValue = initialValue
  }

  public readonly set = (value: T) => {
    this._currentValue = value
    this.watchers.forEach((watcher) => watcher(value))
  }

  public unwatch(watcher: Watcher<T>) {
    const index = this.watchers.findIndex((current) => current === watcher)
    if (index >= 0) this.watchers.splice(index, 1)
  }

  public readonly watch = (watcher: Watcher<T>) => {
    watcher(this._currentValue)
    this.watchers.push(watcher)
    return this
  }
}

export function createObservable<T>(value: T) {
  return new Observable(value)
}
