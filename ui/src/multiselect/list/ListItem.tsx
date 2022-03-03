import React, { FC } from 'react'
import { BLACK } from '../../colors'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ListItemProps } from '../types'

export const ListItem: FC<ListItemProps> = ({
  style,
  selected,
  children,
  onPress,
  label,
}) => {
  return (
    <View
      style={[styles.listItem, style?.item, selected ? style?.selected : null]}
    >
      {children}
      <TouchableOpacity
        onPress={onPress}
        style={[style?.textWrap, selected ? style?.textWrapSelected : null]}
      >
        <Text
          style={[
            styles.text,
            style?.text,
            selected ? style?.textSelected : null,
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ListItem

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    color: BLACK.COMMON,
  },
  listItem: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: Platform.OS === 'ios' ? 5 : 0,
  },
})
