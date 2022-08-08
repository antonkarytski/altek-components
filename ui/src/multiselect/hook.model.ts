import { MultiSelectProps, SelectedValueProps } from './types'
import { Dispatch, SetStateAction, useCallback, useEffect } from 'react'
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
  }: MultiSelectProps<V, L>,
  { onSelect = () => {}, onChange }: MultiSelectActions<V> = {}
) {
  const mode = routeMultiSelectMode({
    containType,
    topButtonBehavior,
  })
  const onSelectRef = useFnRef(onSelect)
  const [items, setItems] = useMultiSelectValues(values, { initialValue, mode })
  const states = useMultiSelectStates({ values: items, topButtonBehavior })
  useMultiSelectStatesActions({ mode, states, setItems })

  const onItemSelect = useCallback(
    (index: number, value?: boolean) => {
      if (index === 0) {
        if (value === true || !items[0].selected) {
          setItems((currentValues) => {
            const valuesList = [...currentValues]
            return valuesList.map((setValue, setIndex) => {
              setValue.selected = mode.topButtonAll
              if (setIndex === 0) {
                setValue.selected = true
                setValue.disabled = mode.topButtonNone
              }
              return setValue
            })
          })
          return onSelectRef.current()
        }
        setItems((currentValues) => {
          const valuesList = [...currentValues]
          if (mode.topButtonNone) {
            valuesList[0].selected = false
            return valuesList
          }
          return valuesList.map((setValue) => {
            setValue.selected = false
            return setValue
          })
        })
        return
      }

      if (value !== undefined) {
        setItems((currentValues) => {
          const valuesList = [...currentValues]
          valuesList[index].selected = value
          return valuesList
        })
        if (value) onSelectRef.current()
        return
      }
      setItems((currentValues) => {
        const valuesList = [...currentValues]
        if (!valuesList[index].selected) onSelectRef.current()
        valuesList[index].selected = !valuesList[index].selected
        return valuesList
      })
    },
    [setItems, items, mode.topButtonAll, mode.topButtonNone, onSelectRef]
  )

  useEffect(() => {
    if (!onChange) return
    if (states.topButtonActive) {
      onChange([items[0].value])
      return
    }

    onChange(
      items
        .map(({ selected, value }, index) => {
          if (index !== 0 && selected) return value
          return null
        })
        .filter((value) => value) as V[]
    )
  }, [states.topButtonActive, items, onChange])

  return { items, onItemSelect, mode, states }
}
