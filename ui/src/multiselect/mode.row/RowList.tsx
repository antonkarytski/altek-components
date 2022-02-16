import React from 'react'
import MultiSelectItemsList from '../list/MultiSelectItemsList'
import { StyleSheet, View } from 'react-native'
import { MultiSelectListProps, MultiSelectModes } from '../types'

type RowListProps<V extends string, L extends string> = {
  selectedItemsType?: MultiSelectModes['selectedItemsType']
} & Omit<MultiSelectListProps<V, L>, 'type' | 'style'>

export default function RowList<V extends string, L extends string>({
  onItemSelect,
  data,
  selectedItemsType = 'empty',
}: RowListProps<V, L>) {
  return (
    <View>
      <MultiSelectItemsList
        inRow
        type={selectedItemsType}
        onItemSelect={onItemSelect}
        data={data}
        style={{
          container: styles.list,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
