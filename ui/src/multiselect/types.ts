import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { ReactElement } from 'react'

export type SelectValue<V extends string, L extends string> = {
  value: V
  label: L
}
export type SelectedValueProps<
  V extends string,
  L extends string
> = SelectValue<V, L> & {
  selected: boolean
  disabled?: boolean
}

export type MultiSelectModes = {
  //itemType: 'checkbox' | 'row' | 'filled' | 'empty'
  containType: 'under' | 'inside'
  topButtonBehavior: 'all' | 'none'
  selectedItemsType: 'filled' | 'empty'
}

export type MultiSelectStyles = {
  input?: ViewStyle
  inputText?: TextStyle
  selectedItemCard?: ViewStyle
  selectedItemText?: TextStyle
  selectedItemIcon?: TextStyle
}

export type MultiSelectProps<V extends string, L extends string> = {
  values: SelectValue<V, L>[]
  initialValue?: V[]
  onChange?: (values: V[]) => void
  placeholder?: string
  showGeneralItem?: boolean
  style?: MultiSelectStyles
  children?: ReactElement<MultiSelectListProps<V, L>>
} & Partial<MultiSelectModes>

export type MultiSelectListStyles = {
  container?: ViewStyle
  listItem?: ViewStyle
  selectedListItem?: ViewStyle
  listItemTextWrap?: ViewStyle
  selectedListItemTextWrap?: ViewStyle
  listItemText?: TextStyle
  selectedListItemText?: TextStyle
  checkbox?: ViewStyle
}

export type MultiSelectListProps<V extends string, L extends string> = {
  style?: MultiSelectListStyles
  containerStyle?: StyleProp<ViewStyle>
  onItemSelect?: (index: number, value?: boolean) => void
  data?: SelectedValueProps<V, L>[]
  inRow?: boolean
  children?: ReactElement<MultiSelectListProps<V, L>>
}

export type SpecifiedMultiSelectInputProps = {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  withShadow?: boolean
  onPress?: () => void
  placeholder?: string
}

export type MultiSelectInputProps = {
  type?: MultiSelectModes['containType']
} & SpecifiedMultiSelectInputProps

export type MultiSelectStateProps<V extends string, L extends string> = {
  values: SelectedValueProps<V, L>[]
  topButtonBehavior: MultiSelectModes['topButtonBehavior']
}

export type ListItemStyles = {
  item?: StyleProp<ViewStyle>
  selected?: StyleProp<ViewStyle>
  textWrap?: StyleProp<ViewStyle>
  textWrapSelected?: StyleProp<ViewStyle>
  text?: StyleProp<TextStyle>
  textSelected?: StyleProp<TextStyle>
  checkbox?: ViewStyle | ViewStyle[] | null | undefined
}
export type ListItemProps = {
  style?: ListItemStyles
  selected?: boolean
  onPress: (index: number) => void
  label: string
  index: number
}
