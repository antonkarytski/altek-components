import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import {
  MultiSelectModes,
  SelectedValueProps,
  SelectValue,
  MultiSelectStateProps,
} from './types'

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

export type UseMultiSelectModes = ReturnType<typeof useMultiSelectMode>

export function useMultiSelectMode({
  type,
  containType,
  topButtonBehavior,
}: Partial<Omit<MultiSelectModes, 'itemType' | 'selectedItemsType'>>) {
  return {
    modal: type === 'modal',
    select: type === 'select',
    row: type === 'row',
    containInside: containType === 'inside',
    containUnder: containType === 'under',
    topButtonNone: topButtonBehavior === 'none',
    topButtonAll: topButtonBehavior === 'all',
  }
}

export type MultiSelectStates = ReturnType<typeof useMultiSelectStates>

export function useMultiSelectStates<V extends string, L extends string>({
  values,
  topButtonBehavior,
}: MultiSelectStateProps<V, L>) {
  const topButtonSelected = values[0].selected
  const allFieldsSelected = values.every(
    ({ selected }, index) => index === 0 || selected
  )
  const allUnselected = values.every(({ selected }, index) => {
    if (topButtonBehavior === 'none' && index === 0) return true
    return !selected
  })
  const someFieldsSelected = values.some(
    ({ selected }, index) => index !== 0 && selected
  )
  const topButtonActive =
    topButtonSelected ||
    (topButtonBehavior === 'all' && (allFieldsSelected || allUnselected))

  return {
    topButtonSelected,
    allFieldsSelected,
    allUnselected,
    someFieldsSelected,
    topButtonActive,
  }
}

type MultiSelectInitProps = {
  mode: UseMultiSelectModes
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
