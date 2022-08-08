import React from 'react'
import ItemsList from '../list/ItemsList'
import EmptyListItem from './EmptyListItem'
import { MultiSelectListProps } from '../types'

export default function EmptyItemsList<V extends string, L extends string>({
  onItemSelect = () => {},
  inRow,
  style,
  data = [],
}: MultiSelectListProps<V, L>) {
  return (
    <ItemsList preventScroll={inRow} data={data} style={style?.container}>
      {({ label, value, selected }, index) => {
        return (
          <EmptyListItem
            key={`${label}${value}`}
            index={index}
            onPress={onItemSelect}
            label={label}
            selected={selected}
          />
        )
      }}
    </ItemsList>
  )
}
