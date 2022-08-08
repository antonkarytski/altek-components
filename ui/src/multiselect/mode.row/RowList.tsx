import React from 'react'
import { StyleSheet, View } from 'react-native'
import { MultiSelectListProps } from '../types'
import EmptyItemsList from '../list.empty/EmptyItemsList'

type RowListProps<V extends string, L extends string> = Omit<MultiSelectListProps<V, L>, 'style'>

export default function RowList<V extends string, L extends string>({
  onItemSelect,
  data,
}: RowListProps<V, L>) {
  return (
    <View>
      <EmptyItemsList
        inRow
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
