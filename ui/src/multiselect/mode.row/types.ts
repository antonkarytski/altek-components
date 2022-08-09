import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export type RowMultiSelectStyles = {
  container?: StyleProp<ViewStyle>
  item?: StyleProp<ViewStyle>
  selectedItem?: StyleProp<ViewStyle>
  itemText?: StyleProp<TextStyle>
  selectedItemText?: StyleProp<TextStyle>
}
