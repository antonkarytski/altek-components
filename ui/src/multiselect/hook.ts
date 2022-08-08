import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { MultiSelectStateProps, SelectedValueProps, SelectValue } from './types'
import { MultiSelectModesRouter } from './helpers'
import { Fn } from 'altek-toolkit'

export function useNormalisedMultiSelectValues<
  V extends string,
  L extends string
>(values: SelectValue<V, L>[]) {
  return useMemo(() => {
    return values.map((value) => {
      return { ...value, selected: false, disabled: false }
    })
  }, [values]) as SelectedValueProps<V, L>[]
}

export type MultiSelectStates = ReturnType<typeof useMultiSelectStates>

function useWillComponentUpdate(fn: Fn, deps: any[]) {
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

export function useMultiSelectStates<V extends string, L extends string>({
  values,
  topButtonBehavior,
}: MultiSelectStateProps<V, L>) {
  const states = useRef({
    topButtonSelected: false,
    allFieldsSelected: false,
    allUnselected: false,
    someFieldsSelected: false,
    topButtonActive: false,
  })

  useWillComponentUpdate(() => {
    states.current.topButtonSelected = values[0].selected
    states.current.allFieldsSelected = true
    states.current.allUnselected = true
    states.current.someFieldsSelected = false
    values.forEach(({ selected }, index) => {
      states.current.allFieldsSelected =
        states.current.allFieldsSelected && (index === 0 || selected)
      states.current.allUnselected =
        states.current.allUnselected &&
        ((topButtonBehavior === 'none' && index === 0) || !selected)
      states.current.someFieldsSelected =
        states.current.someFieldsSelected || (index !== 0 && selected)
    })
    states.current.topButtonActive =
      states.current.topButtonSelected ||
      (topButtonBehavior === 'all' &&
        (states.current.allFieldsSelected || states.current.allUnselected))
  }, [values, topButtonBehavior])

  return states.current
}

type MultiSelectInitProps = {
  mode: MultiSelectModesRouter
  initialValue: string[]
}

export function useMultiSelectValues<V extends string, L extends string>(
  values: SelectValue<V, L>[],
  { mode, initialValue }: MultiSelectInitProps
): [
  SelectedValueProps<V, L>[],
  Dispatch<SetStateAction<SelectedValueProps<V, L>[]>>
] {
  const normalisedValues = useNormalisedMultiSelectValues(values)
  const [renderItems, setRenderItems] = useState(normalisedValues)
  const [isInitiated, setIsInitiated] = useState(false)

  useEffect(() => {
    if (isInitiated) return
    setRenderItems((currentValues) => {
      if (mode.topButtonAll && initialValue?.includes('all')) {
        return currentValues.map((value) => {
          value.selected = true
          return value
        })
      }

      const valuesList = [...currentValues]
      initialValue.forEach((selectedValue) => {
        const selectedItem = valuesList.find(({ value }) => {
          return value === selectedValue
        })
        if (selectedItem) {
          selectedItem.selected = true
        }
      })
      return valuesList
    })
    setIsInitiated(true)
  }, [isInitiated, initialValue, mode.topButtonAll])

  return [renderItems, setRenderItems]
}
