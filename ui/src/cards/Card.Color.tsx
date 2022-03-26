import React, { PropsWithChildren } from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import Text from '../text'
import { ColorPresetStructure } from '../styles/presets'

type ValuesListItem = {
  label: string
  style?: StyleProp<TextStyle>
  fontWeight: 'regular' | 'medium' | 'bold' | 'extraBold'
}

type SingleValueProps<T extends Record<string, string>> =
  | { textDriver: T; label?: string }
  | { textDriver?: T; label: string }

type ColorCardProps<T extends Record<string, string>> = {
  preset: ColorPresetStructure<T>
  style?: StyleProp<ViewStyle>
} & (
  | (SingleValueProps<T> & { valuesList?: never })
  | { valuesList: ValuesListItem[]; textDriver?: never; label?: never }
)

export default function ColorCard<T extends Record<string, string>>({
  preset,
  textDriver: t,
  label,
  valuesList,
  style,
}: PropsWithChildren<ColorCardProps<T>>) {
  return (
    <View style={[preset.wrapperStyle, styles.wrapper, style]}>
      {valuesList ? (
        valuesList.map(({ label, style, fontWeight = 'regular' }, index) => {
          return (
            <Text
              medium={fontWeight === 'medium'}
              bold={fontWeight === 'bold'}
              extraBold={fontWeight === 'extraBold'}
              key={index}
              label={label}
              style={style}
            />
          )
        })
      ) : (
        <Text
          medium
          style={{
            color: preset.color,
          }}
          label={t ? preset.label(t) || label : label}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 6,
  },
})
