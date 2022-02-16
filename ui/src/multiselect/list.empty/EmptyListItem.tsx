import React from 'react'
import ListItem from '../list/ListItem'
import { Platform, StyleSheet } from 'react-native'
import { multiSelectStyles } from '../styles'
import { ListItemProps } from '../types'

export default function EmptyListItem(props: Omit<ListItemProps, 'style'>) {
  return (
    <ListItem
      style={{
        item: [multiSelectStyles.emptyCard, styles.listItemEmpty],
        selected: [
          multiSelectStyles.emptyCardSelected,
          styles.listItemEmptySelected,
        ],
        textWrap: styles.textWrap,
        text: [multiSelectStyles.cardText, styles.text],
        textSelected: multiSelectStyles.emptyCardSelectedText,
      }}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  listItemEmpty: {
    flexDirection: 'column',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemEmptySelected: {},

  checkbox: {
    marginRight: Platform.OS === 'ios' ? 5 : 0,
  },
  listItemTextWrap: {
    flex: 1,
    paddingVertical: 5,
  },
  text: {
    textAlign: 'center',
    width: '100%',
  },
  textWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})
