import React, { ReactElement, ReactNode, useCallback } from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'
import { createEvent, restore } from 'effector'
import { useStore } from 'effector-react'
import { UnionFrom } from '../types'

export type ComponentStyleProps<
  Style extends ViewStyle | TextStyle | undefined
> = {
  style?: StyleProp<Style>
}

export function createColorTheme<
  Themes extends string,
  ThemesList extends Record<Themes, ColorTheme>,
  ColorTheme extends Record<string, string> = UnionFrom<ThemesList>
>(themesList: ThemesList, defaultValue: Themes) {
  type UseThemeInterface = [Themes, (language: Themes) => void, () => void]

  const setColorTheme = createEvent<Themes>()
  const $colorTheme = restore(setColorTheme, defaultValue)

  function useColorTheme(): UseThemeInterface {
    const theme = useStore($colorTheme)

    const set = (newColorTheme: Themes) => {
      if (newColorTheme in themesList) setColorTheme(newColorTheme)
    }

    const setNext = useCallback(() => {
      const themes = Object.keys(themesList) as Themes[]
      const currentIndex = themes.findIndex((current) => current === theme)
      const nextIndex = (() => {
        if (currentIndex < themes.length - 1) return currentIndex + 1
        return 0
      })()
      setColorTheme(themes[nextIndex])
    }, [theme])

    return [theme, set, setNext]
  }

  function useColors() {
    const currentTheme = useStore($colorTheme)
    return themesList[currentTheme]
  }

  function themed<
    S extends ViewStyle | TextStyle | undefined,
    P extends ComponentStyleProps<S>
  >(
    Component: (props: P) => ReactElement<any, any> | null,
    styleFn: (theme: ColorTheme, props: P) => S
  ) {
    return (props: P & { children?: ReactNode }) => {
      const theme = useColors()

      return (
        <Component {...props} style={[props.style, styleFn(theme, props)]} />
      )
    }
  }

  function withThemedProps<P>(
    Component: (props: P) => ReactElement<any, any>,
    fn: (theme: ColorTheme, props: P) => Partial<P>
  ) {
    return (props: P & { children?: ReactNode }) => {
      const theme = useColors()
      return <Component {...props} {...fn(theme, props)} />
    }
  }

  return {
    themed,
    withThemedProps,
    useColors,
    useColorTheme,
    $colorTheme,
    setColorTheme,
  }
}

// export type ColorThemeStructure = Record<keyof typeof LIGHT, string>
// export type ColorThemes = 'LIGHT' | 'DARK'
//
// const LIGHT = {
//   navigationElements: COLORS.COMMON.WHITE,
//   screenBackground: COLORS.GRAY.SCREEN_BACKGROUND,
//   screenBackgroundWhite: COLORS.COMMON.WHITE,
//   backgroundLight: COLORS.GRAY.LIGHT,
//   card: COLORS.COMMON.WHITE,
//   text: COLORS.BLACK.COMMON,
//   subText: COLORS.GRAY.COMMON,
//   textInverted: COLORS.COMMON.WHITE,
//   line: '#F4F4F4',
//   switch: COLORS.BLUE.BORDER,
//   blueCard: COLORS.BLUE.BODY,
//   blueCardText: COLORS.BLUE.COMMON,
//   linkActiveText: COLORS.BLUE.COMMON,
//   dispatcherIcon: '#00A1DB80',
//   darkIcon: COLORS.GRAY.ICON,
// }
//
// const DARK: Record<keyof ColorThemeStructure, string> = {
//   navigationElements: COLORS.BLACK.SCREEN_BACKGROUND,
//   screenBackground: COLORS.BLACK.SCREEN_BACKGROUND,
//   screenBackgroundWhite: COLORS.BLACK.SCREEN_BACKGROUND,
//   backgroundLight: '#363742',
//   card: '#2E2E38',
//   text: COLORS.COMMON.WHITE,
//   textInverted: COLORS.BLACK.COMMON,
//   subText: '#9E9FA8',
//   line: '#636570',
//   switch: '#F9D286',
//   blueCard: '#F9D286',
//   blueCardText: COLORS.COMMON.WHITE,
//   linkActiveText: '#F9D286',
//   dispatcherIcon: '#F9D286',
//   darkIcon: COLORS.GRAY.LIGHT,
// }
//
// export const COLOR_THEMES: Record<ColorThemes, ColorThemeStructure> = {
//   LIGHT,
//   DARK,
// }
//
// export const {
//   useColors,
//   themed,
//   useColorTheme,
//   withThemedProps,
//   $colorTheme,
// } = createColorTheme(COLOR_THEMES, 'LIGHT')
//
// export type GrayLineProps = {
//   style?: StyleProp<ViewStyle>
// }
//
// export const GrayLine: React.FC<GrayLineProps> = ({ style }) => {
//   return <View style={[styles.container, style]} />
// }
//
// const styles = StyleSheet.create({
//   container: {
//     height: 1,
//     backgroundColor: '#F4F4F4',
//     width: '100%',
//   },
// })
//
// export const ThemedLine = themed(GrayLine, (colors) => {
//   return {
//     backgroundColor: colors.line,
//   }
// })
//
// export function Go() {
//   return <ThemedLine style={{}} />
// }
