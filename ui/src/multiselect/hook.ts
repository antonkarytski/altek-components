import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { MultiSelectModes, SelectedValueProps, SelectValue } from './types'
import { useNormalisedMultiSelectValues } from './model/hook.normalisedValues'

type MultiSelectInitProps = {
  topButtonBehavior: MultiSelectModes['topButtonBehavior']
  initialValue: string[]
}

export function useMultiSelectValues<V extends string, L extends string>(
  values: SelectValue<V, L>[],
  { topButtonBehavior, initialValue }: MultiSelectInitProps
): [
  SelectedValueProps<V, L>[],
  Dispatch<SetStateAction<SelectedValueProps<V, L>[]>>
] {
  const normalisedValues = useNormalisedMultiSelectValues(values)
  const isInitiated = useRef(false)
  const [renderItems, setRenderItems] = useState(normalisedValues)

  useEffect(() => {
    if (isInitiated.current) return

    setRenderItems((currentValues) => {
      const isTopButtonAllMode = topButtonBehavior === 'all'
      if (isTopButtonAllMode && initialValue?.includes('all')) {
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
        if (selectedItem) selectedItem.selected = true
      })
      return valuesList
    })

    isInitiated.current = true
  }, [initialValue, topButtonBehavior])

  return [renderItems, setRenderItems]
}
