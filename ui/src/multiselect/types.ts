import { StyleProp, TextStyle, ViewStyle } from 'react-native'

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
  itemType: 'checkbox' | 'row' | 'filled' | 'empty'
  containType: 'under' | 'inside'
  topButtonBehavior: 'all' | 'none'
  selectedItemsType: 'filled' | 'empty'
}
export type MultiSelectProps<V extends string, L extends string> = {
  values: SelectValue<V, L>[]
  initialValue?: V[]
  onChange?: (values: V[]) => void
  placeholder?: string
  showGeneralItem?: boolean
  style?: {
    input?: StyleProp<ViewStyle>
  }
} & Partial<MultiSelectModes>

export type MultiSelectListProps<V extends string, L extends string> = {
  style?: {
    container?: StyleProp<ViewStyle>
    listItem?: StyleProp<ViewStyle>
    selectedListItem?: StyleProp<ViewStyle>
    listItemTextWrap?: StyleProp<ViewStyle>
    checkbox?: StyleProp<ViewStyle>
  }
  onItemSelect: (index: number, value?: boolean) => void
  data: SelectedValueProps<V, L>[]
  type?: MultiSelectModes['itemType']
  inRow?: boolean
}

export type SpecifiedListProps<V extends string, L extends string> = Omit<
  MultiSelectListProps<V, L>,
  'type'
>

export type SpecifiedMultiSelectInputProps = {
  style?: StyleProp<ViewStyle>
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
export type ListItemProps = {
  style?: {
    item?: StyleProp<ViewStyle>
    selected?: StyleProp<ViewStyle>
    textWrap?: StyleProp<ViewStyle>
    textWrapSelected?: StyleProp<ViewStyle>
    text?: StyleProp<TextStyle>
    textSelected?: StyleProp<TextStyle>
    checkbox?: ViewStyle | ViewStyle[] | null | undefined
  }
  selected?: boolean
  onPress: () => void
  label: string
}
