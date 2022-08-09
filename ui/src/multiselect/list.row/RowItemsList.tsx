import React, { useMemo } from 'react'
import ItemsList from '../list/ItemsList'
import RowListItem, { rowListItemStyles } from './RowListItem'
import { MultiSelectListProps } from '../types'
import { composeItemStylesWithListStyles } from '../helpers'
import { FlatList, StyleSheet } from 'react-native'

export default function RowItemsList<V extends string, L extends string>({
  data = [],
  onItemSelect = () => {},
  inRow,
  style,
  containerStyle,
}: MultiSelectListProps<V, L>) {
  const itemStyles = useMemo(
    () => composeItemStylesWithListStyles(rowListItemStyles, style),
    [style]
  )

  return (
    <FlatList
      scrollEnabled={!inRow}
      data={data}
      style={[styles.container, style?.container, containerStyle]}
      contentContainerStyle={styles.containerContent}
      renderItem={({ item: { value, selected, label }, index }) => {
        return (
          <RowListItem
            index={index}
            key={`${label}${value}${index}`}
            onPress={onItemSelect}
            label={label}
            selected={selected}
            style={itemStyles}
          />
        )
      }}
    />
  )
  // return (
  //   <ItemsList
  //     preventScroll={inRow}
  //     data={data}
  //     style={[style?.container, containerStyle]}
  //   >
  //     {({ label, value, selected }, index) => {
  //       return (
  //         <RowListItem
  //           index={index}
  //           key={`${label}${value}${index}`}
  //           onPress={onItemSelect}
  //           label={label}
  //           selected={selected}
  //           style={itemStyles}
  //         />
  //       )
  //     }}
  //   </ItemsList>
  // )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
  },
  containerContent: { flexGrow: 1 },
})
