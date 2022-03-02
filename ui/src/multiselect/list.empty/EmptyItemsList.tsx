import React from 'react'
import ItemsList from '../list/ItemsList'
import EmptyListItem from './EmptyListItem'
import { SpecifiedListProps } from '../types'

export default function EmptyItemsList<V extends string, L extends string>({
  onItemSelect,
  inRow,
  style,
  data,
}: SpecifiedListProps<V, L>) {
  return (
    <ItemsList preventScroll={inRow} data={data} style={style?.container}>
      {({ label, value, selected }, index) => {
        return (
          <EmptyListItem
            key={`${label}${value}`}
            onPress={() => onItemSelect(index)}
            label={label}
            selected={selected}
          />
        )
      }}
    </ItemsList>
  )
}
