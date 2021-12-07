import { Dispatch, SetStateAction, useCallback, useState, useRef } from 'react'
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
