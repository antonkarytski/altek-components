import React from 'react'
import ListItem from '../list/ListItem'
import CheckBox from '@react-native-community/checkbox'
import { ListItemProps } from '../types'
import { Platform, StyleSheet } from 'react-native'
import { BLUE } from '../../colors'

type CheckboxListItemProps = {
  onCheckboxPress: (newValue: boolean) => void
  disabled?: boolean
} & Omit<ListItemProps, 'style'>

const CheckBoxWrapper = CheckBox as any

export default function CheckboxListItem({
  selected,
  onCheckboxPress,
  disabled,
  ...props
}: CheckboxListItemProps) {
  return (
    <ListItem
      style={{
        textWrap: styles.textWrap,
      }}
      selected={selected}
      {...props}
    >
      <CheckBoxWrapper
        style={styles.checkbox}
        tintColors={{ true: BLUE.COMMON }}
        disabled={disabled ?? false}
        value={selected}
        onValueChange={onCheckboxPress}
      />
    </ListItem>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    marginRight: Platform.OS === 'ios' ? 5 : 0,
  },
  textWrap: {
    flex: 1,
    paddingVertical: 5,
  },
})
