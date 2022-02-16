import React from 'react'
import RowItemsList from '../list.row/RowItemsList'
import EmptyItemsList from '../list.empty/EmptyItemsList'
import CheckboxItemsList from '../list.checkbox/CheckboxItemsList'
import { MultiSelectListProps } from '../types'

export default function MultiSelectItemsList<
  V extends string,
  L extends string
>({ type = 'checkbox', ...listProps }: MultiSelectListProps<V, L>) {
  const isRow = type === 'row'
  const isEmpty = type === 'empty'

  if (isRow) {
    return <RowItemsList {...listProps} />
  }
  if (isEmpty) {
    return <EmptyItemsList {...listProps} />
  }
  return <CheckboxItemsList {...listProps} />
}
