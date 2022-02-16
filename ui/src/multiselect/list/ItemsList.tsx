import React, { ReactComponentElement } from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import ConditionalScroll from '../../conditional/ConditionalScroll'
import { SelectedValueProps } from '../types'

type ListProps<V extends string, L extends string> = {
  preventScroll?: boolean
  data: SelectedValueProps<V, L>[]
  children: (
    item: SelectedValueProps<V, L>,
    index: number
  ) => ReactComponentElement<any, { key: string | number }>
  style?: StyleProp<ViewStyle>
}

export default function ItemsList<V extends string, L extends string>({
  preventScroll,
  data,
  style,
  children: childrenFactory,
}: ListProps<V, L>) {
  return (
    <ConditionalScroll
      isScroll={!preventScroll}
      style={[styles.container, style]}
      contentContainerStyle={styles.containerContent}
    >
      {data.map(childrenFactory)}
    </ConditionalScroll>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
  },
  containerContent: { flexGrow: 1 },
})
