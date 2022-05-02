import React, { useEffect, useState } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableHighlight,
  ViewStyle,
} from 'react-native'
import Text from '../text'
import { BLACK, BLUE, COMMON, GRAY, RED, YELLOW } from '../colors'
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

export enum ButtonPresetsNames {
  BLUE = 'BLUE',
  WHITE = 'WHITE',
  RED = 'RED',
  TRANSPARENT = 'TRANSPARENT',
}

export const BIG_BUTTON_PRESET: Record<ButtonPresetsNames, StatesPreset> = {
  [ButtonPresetsNames.BLUE]: {
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
  [ButtonPresetsNames.WHITE]: {
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
  [ButtonPresetsNames.RED]: {
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
  [ButtonPresetsNames.TRANSPARENT]: {
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

export const BIG_BUTTON_PRESET_DARK: Record<
  ButtonPresetsNames,
  StatesPreset
> = {
  [ButtonPresetsNames.BLUE]: {
    common: {
      background: YELLOW.DARK_BODY,
      label: BLACK.COMMON,
      border: COMMON.TRANSPARENT,
    },
    active: {
      background: YELLOW.DARK_BODY,
      label: BLACK.COMMON,
      border: COMMON.TRANSPARENT,
    },
    disabled: {
      background: BLACK.DARK_LIGHT_CARD,
      label: COMMON.WHITE,
      border: COMMON.TRANSPARENT,
    },
  },
  [ButtonPresetsNames.WHITE]: {
    common: {
      background: BLACK.SCREEN_BACKGROUND,
      label: YELLOW.DARK_BODY,
      border: YELLOW.DARK_BODY,
    },
    active: {
      background: YELLOW.DARK_BODY,
      label: COMMON.WHITE,
      border: COMMON.TRANSPARENT,
    },
    disabled: {
      background: COMMON.TRANSPARENT,
      label: BLACK.DARK_LIGHT_CARD,
      border: BLACK.DARK_LIGHT_CARD,
    },
  },
  [ButtonPresetsNames.RED]: {
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
  [ButtonPresetsNames.TRANSPARENT]: {
    common: {
      background: COMMON.TRANSPARENT,
      label: YELLOW.DARK_BODY,
      border: YELLOW.DARK_BODY,
    },
    active: {
      background: YELLOW.DARK_BODY,
      label: BLACK.COMMON,
      border: COMMON.TRANSPARENT,
    },
    disabled: {
      background: COMMON.TRANSPARENT,
      label: BLACK.DARK_LIGHT_CARD,
      border: BLACK.DARK_LIGHT_CARD,
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
        <Text
          label={label}
          bold
          style={[bigButtonStyles.label, activeStyles.label]}
        />
      )}
    </TouchableHighlight>
  )
}
