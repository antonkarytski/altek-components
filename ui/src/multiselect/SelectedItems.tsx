import React from 'react'
import SelectedCard, { SelectCardStyles } from './SelectedCard'
import { MultiSelectModes, SelectedValueProps } from './types'
import { MultiSelectStates } from './model/model.states'

export type SelectedItemsProps<V extends string, L extends string> = {
  showGeneralItem?: boolean
  type?: MultiSelectModes['selectedItemsType']
  onPressItem: (index: number, state: boolean) => void
  onPressGeneralItem?: () => void
  states: MultiSelectStates
  values: SelectedValueProps<V, L>[]
} & SelectCardStyles

const SelectedItems = React.memo(
  <V extends string, L extends string>({
    values,
    showGeneralItem,
    onPressItem,
    onPressGeneralItem,
    type,
    states: { topButtonSelected, allFieldsSelected, allUnselected },
    ...styles
  }: SelectedItemsProps<V, L>) => {
    if (topButtonSelected || allFieldsSelected || allUnselected) {
      if (!showGeneralItem) return null
      return (
        <SelectedCard
          type={type}
          label={values[0].label}
          hideRemoveButton
          onPress={onPressGeneralItem}
          index={0}
          {...styles}
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
              onPress={onPressItem}
              index={index}
              {...styles}
            />
          )
        })}
      </>
    )
  }
)

export default SelectedItems
