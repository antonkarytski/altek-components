import React from 'react'
import { StyleSheet } from 'react-native'
import RowList from './RowList'
import MultiSelectInput from '../input/MultiSelectInput'
import { useMultiSelectModel } from '../hook.model'
import { MultiSelectProps } from '../types'

export default function RowMultiSelect<V extends string, L extends string>({
  containType,
  selectedItemsType,
  values,
  topButtonBehavior,
  initialValue,
  onChange,
  style,
}: Omit<
  MultiSelectProps<V, L>,
  'type' | 'placeholder' | 'showGeneralItem' | 'itemType'
>) {
  const { items, onItemSelect } = useMultiSelectModel(
    {
      values,
      initialValue,
      containType,
      type: 'row',
      topButtonBehavior,
    },
    { onChange }
  )

  return (
    <MultiSelectInput style={[styles.input, style?.input]}>
      <RowList
        onItemSelect={onItemSelect}
        data={items}
        selectedItemsType={selectedItemsType}
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
