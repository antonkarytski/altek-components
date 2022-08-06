import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React from 'react'
import { createColorTheme } from './index'

type ColorThemeStructure = Record<keyof typeof LIGHT, string>
type ColorThemes = 'LIGHT' | 'DARK'

const LIGHT = {
  red: 'red',
  green: 'green',
}

const DARK: Record<keyof ColorThemeStructure, string> = {
  red: 'green',
  green: 'red',
}

const COLOR_THEMES: Record<ColorThemes, ColorThemeStructure> = {
  LIGHT,
  DARK,
}

const { useColors, themed, useColorTheme, withThemedProps, $colorTheme } =
  createColorTheme(COLOR_THEMES, 'LIGHT')

type GrayLineProps = {
  style?: StyleProp<ViewStyle>
  model: number
}

const TestView: React.FC<GrayLineProps> = ({ style }) => {
  return <View style={[styles.container, style]} />
}

const ThemedTestView = themed(TestView, (colors, props) => {
  return {
    backgroundColor: props.model ? colors.red : colors.green,
  } as ViewStyle
})

function go() {
  return (
    <ThemedTestView model={22}>
      <View />
    </ThemedTestView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 1,
  },
})
