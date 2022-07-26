import { ColorPresetStructure } from '../styles/presets'
import { StyleProp, ViewStyle } from 'react-native'
import { Fn } from 'altek-toolkit'

export type CardModalProps = {
  preset?: ColorPresetStructure
  title: string
  style?: {
    container?: StyleProp<ViewStyle>
    header?: StyleProp<ViewStyle>
    contentWrapper?: StyleProp<ViewStyle>
  }
  animatedStyle?: any
  onTouch?: Fn
}
