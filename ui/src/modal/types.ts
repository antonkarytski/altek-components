import { ColorPreset } from '../styles/presets'

export type CardModalProps = {
  preset?: ColorPreset
  title: string
  style?: any
  onTouch?: () => void
}
