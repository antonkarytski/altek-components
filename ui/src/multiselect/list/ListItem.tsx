import React, { PropsWithChildren } from 'react'
import { BLACK } from '../../colors'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ListItemProps } from '../types'

export const ListItem = React.memo(
  ({
    style,
    selected,
    children,
    onPress,
    label,
    index,
  }: PropsWithChildren<ListItemProps>) => {
    return (
      <View
        style={[
          styles.listItem,
          style?.item,
          selected ? style?.selected : null,
        ]}
      >
        {children}
        <TouchableOpacity
          onPress={() => onPress(index)}
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
)

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
    paddingHorizontal: 15,
  },
  checkbox: {
    marginRight: Platform.OS === 'ios' ? 5 : 0,
  },
})
