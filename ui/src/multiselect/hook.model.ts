import { MultiSelectProps, SelectedValueProps } from './types'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react'
import {
  MultiSelectStates,
  useMultiSelectStates,
  useMultiSelectValues,
} from './hook'
import { routeMultiSelectMode, MultiSelectModesRouter } from './helpers'
import { useFnRef } from 'altek-toolkit'

export type UseMultiSelectStatesActionsProps<
  V extends string,
  L extends string
> = {
  mode: MultiSelectModesRouter
  states: MultiSelectStates
  setItems: Dispatch<SetStateAction<SelectedValueProps<V, L>[]>>
}

export function useMultiSelectStatesActions<
  V extends string,
  L extends string
>({
  mode,
  states: { topButtonSelected, allFieldsSelected, someFieldsSelected },
  setItems,
}: UseMultiSelectStatesActionsProps<V, L>) {
  useEffect(() => {
    if (!mode.topButtonAll) return
    if (topButtonSelected && !allFieldsSelected) {
      setItems((currentValues) => {
        const valuesList = [...currentValues]
        valuesList[0].selected = false
        return valuesList
      })
    }
    if (!topButtonSelected && allFieldsSelected) {
      setItems((currentValues) => {
        const valuesList = [...currentValues]
        valuesList[0].selected = true
        return valuesList
      })
    }
    return
  }, [topButtonSelected, allFieldsSelected, mode.topButtonAll, setItems])

  useEffect(() => {
    if (!mode.topButtonNone) return
    if (someFieldsSelected && topButtonSelected) {
      setItems((currentValues) => {
        const valuesList = [...currentValues]
        valuesList[0].disabled = false
        valuesList[0].selected = false
        return valuesList
      })
    }

    if (!someFieldsSelected && !topButtonSelected) {
      setItems((currentValues) => {
        const valuesList = [...currentValues]
        valuesList[0].disabled = true
        valuesList[0].selected = true
        return valuesList
      })
    }
  }, [someFieldsSelected, topButtonSelected, mode.topButtonNone, setItems])
}

type MultiSelectActions<V extends string> = {
  onSelect?: () => void
  onChange?: (values: V[]) => void
}

export function useMultiSelectModel<V extends string, L extends string>(
  {
    containType = 'inside',
    topButtonBehavior = 'all',
    values,
    initialValue = [],
  }: Omit<MultiSelectProps<V, L>, 'children'>,
  { onSelect = () => {}, onChange }: MultiSelectActions<V> = {}
) {
  const mode = routeMultiSelectMode({
    containType,
    topButtonBehavior,
  })
  const onSelectRef = useFnRef(onSelect)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  const [items, setItems] = useMultiSelectValues(values, { initialValue, mode })
  const states = useMultiSelectStates({ values: items, topButtonBehavior })
  useMultiSelectStatesActions({ mode, states, setItems })

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

  return { items, onItemSelect, mode, states }
}
