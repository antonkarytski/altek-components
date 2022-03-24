import { ColorPresetStructure } from '../styles/presets'

export type CardModalProps = {
  preset?: ColorPresetStructure
  title: string
  style?: any
  onTouch?: () => void
}
