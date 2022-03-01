import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { COLOR_PRESET, ColorPreset } from '../styles/presets'
import { Fn } from 'altek-toolkit'
import { shadowsStyles } from '../styles'
import { submitModalStyles } from './styles'
import Text from '../text'

export type SubmitModalInnerProps = {
  title: string
  preset?: ColorPreset
  disableSubmit?: boolean
  submitLabel: string
  rejectLabel?: string
  onSubmit: Fn
  onReject?: Fn
}

export const SubmitModalInner: React.FC<SubmitModalInnerProps> = ({
  disableSubmit,
  rejectLabel = '',
  submitLabel,
  children,
  title,
  preset = COLOR_PRESET.BLUE,
  onSubmit,
  onReject,
}) => {
  return (
    <View style={[submitModalStyles.container, shadowsStyles.elevation5]}>
      <View style={submitModalStyles.modal}>
        <View style={[submitModalStyles.labelWrapper, preset.wrapperStyle]}>
          <Text
            bold
            style={[submitModalStyles.label, { color: preset.color }]}
            label={title}
          />
        </View>
        <View style={submitModalStyles.content}>{children}</View>
        <View style={submitModalStyles.buttonWrapper}>
          {onReject ? (
            <TouchableOpacity
              onPress={onReject}
              style={[submitModalStyles.button, submitModalStyles.leftButton]}
            >
              <Text
                style={[
                  submitModalStyles.leftButtonLabel,
                  submitModalStyles.buttonLabel,
                ]}
                label={rejectLabel}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {onSubmit ? (
            <TouchableOpacity
              disabled={disableSubmit}
              onPress={onSubmit}
              style={[submitModalStyles.button, preset.wrapperStyle]}
            >
              <Text
                style={[submitModalStyles.buttonLabel, { color: preset.color }]}
                label={submitLabel}
              />
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
      </View>
    </View>
  )
}

export default SubmitModalInner
