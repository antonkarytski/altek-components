import { Fn } from 'altek-toolkit'

export type ImageEditor = 'avatar' | 'submit'
export type PhotoOptions = Partial<{
  uri?: string
}>
export type EditorProps = {
  onAccept: (options?: PhotoOptions) => void
  onCancel: Fn
  uri: string
}
export type ImageEditorResult = {
  uri?: string
}
export type CameraProps = {
  postHandler?: ImageEditor
}
