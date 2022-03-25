import React, { PropsWithChildren } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { RightArrowIcon } from '../icons'
import Text from '../text'
import { COLOR_PRESET, ColorPresetStructure } from '../styles/presets'
import { colorHeaderStyles } from './styles'

export type ColorHeaderProps<T extends Record<string, string>> = {
  preset?: ColorPresetStructure<T>
  useStatusText?: boolean
  style?: StyleProp<ViewStyle>
  withArrow?: boolean

  styleOverride?: StyleProp<ViewStyle>
} & ({ label?: string; textDriver: T } | { label: string; textDriver?: T })

function ColorHeader<T extends Record<string, string>>({
  style,
  withArrow,
  label = '',
  textDriver: t,
  preset = (COLOR_PRESET.BLANK as unknown) as ColorPresetStructure<T>,
  children,
  styleOverride,
}: PropsWithChildren<ColorHeaderProps<T>>) {
  const { wrapperStyle, color } = preset

  return (
    <View
      style={[
        styleOverride ? styleOverride : colorHeaderStyles.header,
        withArrow ? colorHeaderStyles.headerWithArrow : null,
        wrapperStyle,
        style,
      ]}
    >
      {children ? (
        children
      ) : (
        <Text
          bold
          style={[colorHeaderStyles.headerTitle, { color }]}
          label={t ? preset.label(t) || label : label}
        />
      )}
      {withArrow ? (
        <RightArrowIcon style={colorHeaderStyles.arrow} color={color} />
      ) : null}
    </View>
  )
}

export default ColorHeader
