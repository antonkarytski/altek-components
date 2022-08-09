import { MultiSelectModes, MultiSelectProps, SelectedValueProps } from './types'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react'
import { useMultiSelectValues } from './hook'
import { useFnRef } from 'altek-toolkit'
import { MultiSelectStates, useMultiSelectStates } from './model/model.states'

export type UseMultiSelectStatesActionsProps<
  V extends string,
  L extends string
> = {
  topButtonBehavior: MultiSelectModes['topButtonBehavior']
  states: MultiSelectStates
  setItems: Dispatch<SetStateAction<SelectedValueProps<V, L>[]>>
}

export function useMultiSelectStatesActions<
  V extends string,
  L extends string
>({
  topButtonBehavior,
  states: { topButtonSelected, allFieldsSelected, someFieldsSelected },
  setItems,
}: UseMultiSelectStatesActionsProps<V, L>) {
  useEffect(() => {
    const isTopButtonAll = topButtonBehavior === 'all'
    if (!isTopButtonAll || topButtonSelected === allFieldsSelected) return
    setItems((currentValues) => {
      const valuesList = [...currentValues]
      valuesList[0].selected = allFieldsSelected
      return valuesList
    })
  }, [topButtonSelected, allFieldsSelected, topButtonBehavior, setItems])

  useEffect(() => {
    const isTopButtonNone = topButtonBehavior === 'none'
    if (!isTopButtonNone || someFieldsSelected !== topButtonSelected) return
    setItems((currentValues) => {
      const valuesList = [...currentValues]
      valuesList[0].disabled = !topButtonSelected
      valuesList[0].selected = !topButtonSelected
      return valuesList
    })
  }, [someFieldsSelected, topButtonSelected, topButtonBehavior, setItems])
}

type MultiSelectActions<V extends string> = {
  onSelect?: () => void
  onChange?: (values: V[]) => void
}

export function useMultiSelectModel<V extends string, L extends string>(
  {
    topButtonBehavior = 'all',
    values,
    initialValue = [],
  }: Omit<MultiSelectProps<V, L>, 'children'>,
  { onSelect = () => {}, onChange }: MultiSelectActions<V> = {}
) {
  const onSelectRef = useFnRef(onSelect)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const [items, setItems] = useMultiSelectValues(values, {
    initialValue,
    topButtonBehavior,
  })
  const states = useMultiSelectStates({ values: items, topButtonBehavior })
  useMultiSelectStatesActions({ topButtonBehavior, states, setItems })

  const onItemSelect = useCallback(
    (index: number, value?: boolean) => {
      let isSelected = false
      const isTobButtonNoneMode = topButtonBehavior === 'none'
      setItems((currentItems) => {
        if (index === 0) {
          if (value || !currentItems[0].selected) {
            const newItems = currentItems.map((setValue, setIndex) => {
              setValue.selected = topButtonBehavior === 'all'
              if (setIndex === 0) {
                setValue.selected = true
                setValue.disabled = isTobButtonNoneMode
              }
              return setValue
            })
            isSelected = true
            return newItems
          }
          if (isTobButtonNoneMode) {
            const newItems = [...currentItems]
            newItems[0].selected = false
            return newItems
          }
          return currentItems.map((setValue) => {
            setValue.selected = false
            return setValue
          })
        }

        if (value !== undefined) {
          const newItems = [...currentItems]
          newItems[index].selected = value
          isSelected = value
          return newItems
        }

        const newItems = [...currentItems]
        const nextState = !newItems[index].selected
        isSelected = nextState
        newItems[index].selected = nextState
        return newItems
      })

      if (isSelected) onSelectRef.current()
    },
    [setItems, onSelectRef, topButtonBehavior]
  )

  useEffect(() => {
    if (!onChangeRef.current) return
    if (states.topButtonActive) {
      onChangeRef.current([items[0].value])
      return
    }

    onChangeRef.current(
      items
        .map(({ selected, value }, index) => {
          if (index !== 0 && selected) return value
          return null
        })
        .filter((value) => value) as V[]
    )
  }, [states.topButtonActive, items])

  return { items, onItemSelect, states }
}
