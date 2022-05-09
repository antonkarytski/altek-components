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
    Component: (props: P) => ReactElement<any, any>,
    styleFn: (theme: ColorTheme, props: P) => StyleProp<S>
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
