import { Fn } from 'altek-toolkit'

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
}
