import React from 'react'
import ListItem from '../list/ListItem'
import { ListItemProps } from '../types'
import { StyleSheet } from 'react-native'
import { GRAY } from '../../colors'

type RowListItemProps = Omit<ListItemProps, 'style'>

export default function RowListItem(props: RowListItemProps) {
  return <ListItem style={styles} {...props} />
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 0,
    height: 30,
  },
  selected: {
    backgroundColor: GRAY.BODY,
  },
  textWrap: {
    flex: 1,
    paddingVertical: 5,
  },
  textWrapSelected: {
    backgroundColor: GRAY.BODY,
  },
})
