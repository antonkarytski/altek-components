import React from 'react'
import ItemsList from '../list/ItemsList'
import { MultiSelectListProps } from '../types'
import { EmptyItemsListStyles } from './types'
import ListItem from '../list/ListItem'

type EmptyItemsListProps<V extends string, L extends string> = {
  onItemSelect: MultiSelectListProps<V, L>['onItemSelect']
  inRow: boolean
  style: EmptyItemsListStyles
  data: MultiSelectListProps<V, L>['data']
}

export default function EmptyItemsList<V extends string, L extends string>({
  onItemSelect = () => {},
  inRow,
  style,
  data = [],
}: EmptyItemsListProps<V, L>) {
  return (
    <ItemsList preventScroll={inRow} data={data} style={style?.container}>
      {({ label, value, selected }, index) => {
        return (
          <ListItem
            key={`${label}${value}`}
            onPress={onItemSelect}
            label={label}
            index={index}
            selected={selected}
            style={style}
          />
        )
      }}
    </ItemsList>
  )
}
