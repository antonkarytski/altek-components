import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useRef,
  MutableRefObject,
} from 'react'
import { Fn } from './types'

export function useToggle(
  initial: boolean
): [boolean, Fn, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState(initial)
  const toggle = useCallback(() => {
    setValue((state) => !state)
  }, [])

  return [value, toggle, setValue]
}

export function useFnRef<T extends Function>(fn: T) {
  const ref = useRef(fn)
  ref.current = fn
  return ref
}

export function useConst<T>(initGenerator: () => T) {
  const ref = useRef<T>(null) as MutableRefObject<T>
  if (ref.current === null) {
    ref.current = initGenerator()
  }
  return ref.current
}

export function useModel<T>(Model: { new (): T }) {
  return useConst(() => new Model())
}

export function useWillComponentUpdate(fn: Fn, deps: any[]) {
  const prevDeps = useRef<any[] | null>(null)
  if (!prevDeps.current) {
    prevDeps.current = deps
    return fn()
  }
  if (!prevDeps.current.length) return
  const isChanged = prevDeps.current.some(
    (value, index) => value !== deps[index]
  )
  if (!isChanged) return
  prevDeps.current = deps
  fn()
}
