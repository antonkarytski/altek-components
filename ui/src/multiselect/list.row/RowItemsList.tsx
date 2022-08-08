import React from 'react'
import ItemsList from '../list/ItemsList'
import RowListItem from './RowListItem'
import { MultiSelectListProps } from '../types'

export default function RowItemsList<V extends string, L extends string>({
  data = [],
  onItemSelect = () => {},
  inRow,
  style,
}: MultiSelectListProps<V, L>) {
  return (
    <ItemsList preventScroll={inRow} data={data} style={style?.container}>
      {({ label, value, selected }, index) => {
        return (
          <RowListItem
            index={index}
            key={`${label}${value}${index}`}
            onPress={onItemSelect}
            label={label}
            selected={selected}
          />
        )
      }}
    </ItemsList>
  )
}
