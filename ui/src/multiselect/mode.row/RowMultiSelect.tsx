import React from 'react'
import { StyleSheet } from 'react-native'
import RowList from './RowList'
import MultiSelectInput from '../input/MultiSelectInput'
import { useMultiSelectModel } from '../hook.model'
import { MultiSelectProps } from '../types'

export default function RowMultiSelect<V extends string, L extends string>({
  containType = 'inside',
  values,
  topButtonBehavior = 'all',
  initialValue,
  onChange,
  style,
}: Omit<
  MultiSelectProps<V, L>,
  'placeholder' | 'showGeneralItem' | 'children'
>) {
  const { items, onItemSelect } = useMultiSelectModel(
    {
      values,
      initialValue,
      containType,
      topButtonBehavior,
    },
    { onChange }
  )

  return (
    <MultiSelectInput style={[styles.input, style?.input]}>
      <RowList
        onItemSelect={onItemSelect}
        data={items}
      />
    </MultiSelectInput>
  )
}

const styles = StyleSheet.create({
  input: {
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
})
