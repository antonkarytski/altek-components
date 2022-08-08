import React from 'react'
import ItemsList from '../list/ItemsList'
import CheckboxListItem from './CheckboxListItem'
import { MultiSelectListProps } from '../types'

export default function CheckboxItemsList<V extends string, L extends string>({
  data = [],
  onItemSelect = () => {},
  inRow,
}: MultiSelectListProps<V, L>) {
  return (
    <ItemsList preventScroll={inRow} data={data}>
      {({ label, value, selected, disabled }, index) => {
        return (
          <CheckboxListItem
            key={`${label}${value}${index}`}
            onCheckboxPress={(newValue) => {
              onItemSelect(index, newValue)
            }}
            onPress={() => onItemSelect(index)}
            label={label}
            selected={selected}
            disabled={disabled}
          />
        )
      }}
    </ItemsList>
  )
}
