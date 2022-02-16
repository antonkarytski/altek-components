import React from 'react'
import ListItem from '../list/ListItem'
import CheckBox from '@react-native-community/checkbox'
import { ListItemProps } from '../types'
import { StyleSheet } from 'react-native'
import { IS_IOS } from '../../../lib/platform'
import { BLUE } from '../../../styles/colors'

type CheckboxListItemProps = {
  onCheckboxPress: (newValue: boolean) => void
  disabled?: boolean
} & Omit<ListItemProps, 'style'>

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
      <CheckBox
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
    marginRight: IS_IOS ? 5 : 0,
  },
  textWrap: {
    flex: 1,
    paddingVertical: 5,
  },
})