import React from 'react'
import ListItem from '../list/ListItem'
import { ListItemProps } from '../types'
import { StyleSheet } from 'react-native'
import { GRAY } from '../../colors'

const RowListItem = React.memo((props: ListItemProps) => {
  return <ListItem style={props.style} {...props} />
})

export default RowListItem

export const rowListItemStyles = StyleSheet.create({
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
