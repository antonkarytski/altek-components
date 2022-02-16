import { useEffect, useRef, useState } from 'react'
import { Observable } from './Observable'

export function useObservable<T>(observable: Observable<T>) {
  const previousState = useRef(observable.currentValue)
  const [state, setState] = useState(observable.currentValue)

  useEffect(() => {
    const watcher = (value: T) => {
      if (previousState.current === value) return
      previousState.current = value
      setState(value)
    }
    observable.watch(watcher)
    return () => observable.unwatch(watcher)
  }, [observable])

  return state
}
