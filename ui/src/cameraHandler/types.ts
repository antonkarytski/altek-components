import { Fn } from 'altek-toolkit'
import { StyleProp, ViewStyle } from 'react-native'

export enum ImageEditorType {
  avatar = 'avatar',
  submit = 'submit',
}

export type PhotoOptions = Partial<{
  uri?: string
}>

export type EditorProps = {
  onAccept: (options?: PhotoOptions) => void
  onCancel: Fn
  uri: string
  style?: StyleProp<ViewStyle>
}
