import React, { useEffect, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  ViewStyle,
} from 'react-native'
import Text from '../text'
import { BLUE, COMMON, GRAY, RED } from '../colors'
import { Fn, NodeFn } from 'altek-toolkit'
import { bigButtonStyles } from './styles'

type Preset = {
  background: string
  label: string
  border: string
}

type StatesPreset = {
  common: Preset
  active: Preset
  disabled: Preset
}

type PresetsNames = 'BLUE' | 'WHITE' | 'RED' | 'TRANSPARENT'
export const BIG_BUTTON_PRESET: Record<PresetsNames, StatesPreset> = {
  BLUE: {
    common: {
      background: BLUE.COMMON,
      label: COMMON.WHITE,
      border: COMMON.TRANSPARENT,
    },
    active: {
      background: BLUE.PRESSED,
      label: COMMON.WHITE,
      border: COMMON.TRANSPARENT,
    },
    disabled: {
      background: BLUE.DISABLED,
      label: COMMON.WHITE,
      border: COMMON.TRANSPARENT,
    },
  },
  WHITE: {
    common: {
      background: COMMON.WHITE,
      label: BLUE.COMMON,
      border: BLUE.COMMON,
    },
    active: {
      background: BLUE.PRESSED,
      label: COMMON.WHITE,
      border: COMMON.TRANSPARENT,
    },
    disabled: {
      background: COMMON.TRANSPARENT,
      label: GRAY.COMMON,
      border: GRAY.DARK_BORDER,
    },
  },
  RED: {
    common: {
      background: COMMON.TRANSPARENT,
      label: RED.TEXT,
      border: RED.BORDER,
    },
    active: {
      background: COMMON.TRANSPARENT,
      label: GRAY.COMMON,
      border: GRAY.DARK_BORDER,
    },
    disabled: {
      background: COMMON.TRANSPARENT,
      label: GRAY.COMMON,
      border: GRAY.DARK_BORDER,
    },
  },
  TRANSPARENT: {
    common: {
      background: COMMON.TRANSPARENT,
      label: BLUE.COMMON,
      border: BLUE.COMMON,
    },
    active: {
      background: BLUE.PRESSED,
      label: COMMON.WHITE,
      border: COMMON.TRANSPARENT,
    },
    disabled: {
      background: COMMON.TRANSPARENT,
      label: GRAY.COMMON,
      border: GRAY.DARK_BORDER,
    },
  },
} as const

export type BigButtonProps = {
  onPress: Fn
  disabled?: boolean
  preset?: StatesPreset
  style?: StyleProp<ViewStyle>
  disabledStyle?: StyleProp<ViewStyle>
  label?: string
  children?: NodeFn<Preset>
}

export default function BigButton({
  onPress,
  children,
  disabled = false,
  preset = BIG_BUTTON_PRESET.BLUE,
  style,
  label,
  disabledStyle,
}: BigButtonProps) {
  const [presetState, setPresetState] = useState(preset.common)

  const activeStyles = StyleSheet.create({
    button: {
      borderColor: presetState.border,
      backgroundColor: presetState.background,
    },
    label: {
      color: presetState.label,
    },
  })

  const onUnderlayAction = (isPressed: boolean) => {
    if (disabled) return
    if (isPressed) return setPresetState(preset.active)
    setPresetState(preset.common)
  }

  useEffect(() => {
    if (disabled) return setPresetState(preset.disabled)
    setPresetState(preset.common)
  }, [disabled, preset])

  return (
    <TouchableHighlight
      disabled={disabled}
      underlayColor={preset.active.background}
      onShowUnderlay={() => onUnderlayAction(true)}
      onHideUnderlay={() => onUnderlayAction(false)}
      onPress={onPress}
      style={[
        bigButtonStyles.button,
        activeStyles.button,
        style,
        disabled ? disabledStyle : null,
      ]}
    >
      {children ? (
        children(presetState)
      ) : (
        <Text bold style={[bigButtonStyles.label, activeStyles.label]}>
          {label}
        </Text>
      )}
    </TouchableHighlight>
  )
}
