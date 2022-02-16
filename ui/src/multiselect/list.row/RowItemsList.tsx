import React from 'react'
import ItemsList from '../list/ItemsList'
import RowListItem from './RowListItem'
import { SpecifiedListProps } from '../types'

export default function RowItemsList<V extends string, L extends string>({
  data,
  onItemSelect,
  inRow,
  style,
}: SpecifiedListProps<V, L>) {
  return (
    <ItemsList preventScroll={inRow} data={data} style={style?.container}>
      {({ label, value, selected }, index) => {
        return (
          <RowListItem
            key={`${label}${value}${index}`}
            onPress={() => onItemSelect(index)}
            label={label}
            selected={selected}
          />
        )
      }}
    </ItemsList>
  )
}
