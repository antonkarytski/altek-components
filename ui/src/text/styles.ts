import { BLACK, BLUE, GRAY } from '../colors'
import { TextStyle } from 'react-native'

const FONTS = {
  REGULAR: 'IBMPlex-400',
  MEDIUM: 'IBMPlex-500',
  BOLD: 'IBMPlex-600',
  EXTRA_BOLD: 'IBMPlex-700',
}

type SetDefaultFontsProps = {
  regular?: string
  medium?: string
  bold?: string
  extraBold?: string
  size?: number
  color?: string
}

export const textStyles = {
  defaults: {
    color: BLACK.COMMON as string,
    fontSize: 14,
  } as TextStyle,
  regular: {
    fontFamily: FONTS.REGULAR,
  } as TextStyle,
  medium: {
    fontFamily: FONTS.MEDIUM,
  } as TextStyle,
  bold: {
    fontFamily: FONTS.BOLD,
  } as TextStyle,
  extraBold: {
    fontFamily: FONTS.EXTRA_BOLD,
  } as TextStyle,
  titleSmall: {
    fontSize: 18,
    lineHeight: 23,
    fontFamily: FONTS.MEDIUM,
  } as TextStyle,
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: FONTS.BOLD,
  } as TextStyle,
  link: {
    color: BLUE.COMMON,
    fontFamily: FONTS.BOLD,
  } as TextStyle,
  center: {
    textAlign: 'center',
  } as TextStyle,
  subLine: {
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    color: GRAY.COMMON,
  } as TextStyle,
  font10: {
    fontSize: 10,
  } as TextStyle,
  font12: {
    fontSize: 12,
  } as TextStyle,
  font18: {
    fontSize: 18,
  } as TextStyle,
}

const initProps = {
  isInitiated: false,
  timeoutExpired: false,
}
setTimeout(() => {
  initProps.timeoutExpired = true
}, 100)

export function setDefaults({
  regular,
  medium,
  bold,
  extraBold,
  size,
  color,
}: SetDefaultFontsProps) {
  if (initProps.isInitiated) return
  if (!initProps.timeoutExpired) {
    console.warn('You are trying ti set defaults after app init')
    return
  }
  initProps.isInitiated = true
  if (regular) textStyles.regular.fontFamily = regular
  if (medium) {
    textStyles.medium.fontFamily = medium
    textStyles.subLine.fontFamily = medium
    textStyles.titleSmall.fontFamily = medium
  }
  if (bold) {
    textStyles.bold.fontFamily = bold
    textStyles.title.fontFamily = bold
    textStyles.link.fontFamily = bold
  }
  if (extraBold) textStyles.extraBold.fontFamily = extraBold
  if (size) textStyles.defaults.fontSize = size
  if (color) textStyles.defaults.color = color
}
