import React, { ReactNode } from 'react'
import { Text as RawText, TextProps as NativeTextProps } from 'react-native'
import { textStyles } from './styles'

export type TextProps = {
  medium?: boolean
  bold?: boolean
  extraBold?: boolean
  subline?: boolean
  children?: ReactNode
  label?: string | number
} & NativeTextProps

export default function Text({
  medium,
  bold,
  extraBold,
  children,
  style,
  label,
  ...props
}: TextProps) {
  const fontStyle = [
    textStyles.regular,
    textStyles.defaults,
    medium ? textStyles.medium : null,
    bold ? textStyles.bold : null,
    extraBold ? textStyles.extraBold : null,
    style,
  ]

  return (
    <RawText style={fontStyle} {...props}>
      {label || children}
    </RawText>
  )
}

export { textStyles }
