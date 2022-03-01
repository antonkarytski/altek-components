import React, { FC } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { RightArrowIcon } from '../icons'
import Text from '../text'
import { COLOR_PRESET, ColorPreset } from '../styles/presets'
import { colorHeaderStyles } from './styles'

type ColorHeaderProps = {
  preset?: ColorPreset
  useStatusText?: boolean
  style?: StyleProp<ViewStyle>
  withArrow?: boolean
  label?: string
  styleOverride?: StyleProp<ViewStyle>
}

const ColorHeader: FC<ColorHeaderProps> = ({
  style,
  withArrow,
  label = '',
  preset = COLOR_PRESET.BLANK,
  children,
  styleOverride,
}) => {
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
          label={label}
        />
      )}
      {withArrow ? (
        <RightArrowIcon style={colorHeaderStyles.arrow} color={color} />
      ) : null}
    </View>
  )
}

export default ColorHeader
