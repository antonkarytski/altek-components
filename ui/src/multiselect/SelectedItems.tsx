import React from 'react'
import SelectedCard from './SelectedCard'
import { useMultiSelectStates } from './hook'
import { MultiSelectModes, MultiSelectStateProps } from './types'

export type SelectedItemsProps<V extends string, L extends string> = {
  showGeneralItem?: boolean
  type?: MultiSelectModes['selectedItemsType']
  onPressItem: (index: number, state: boolean) => void
  onPressGeneralItem?: () => void
} & MultiSelectStateProps<V, L>

const SelectedItems = React.memo(
  <V extends string, L extends string>({
    values,
    topButtonBehavior,
    showGeneralItem,
    onPressItem,
    onPressGeneralItem,
    type,
  }: SelectedItemsProps<V, L>) => {
    const { topButtonSelected, allFieldsSelected, allUnselected } =
      useMultiSelectStates({ values, topButtonBehavior })

    if (topButtonSelected || allFieldsSelected || allUnselected) {
      if (!showGeneralItem) return null
      return (
        <SelectedCard
          type={type}
          label={values[0].label}
          hideRemoveButton
          onPress={onPressGeneralItem}
        />
      )
    }

    return (
      <>
        {values.map(({ selected, value, label }, index) => {
          if (!selected) return null
          return (
            <SelectedCard
              type={type}
              key={`${value}${index}`}
              label={label}
              onPress={() => onPressItem(index, false)}
            />
          )
        })}
      </>
    )
  }
)

export default SelectedItems
