import { BLACK, BLUE, GRAY } from '../colors'

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
  },
  regular: {
    fontFamily: FONTS.REGULAR,
  },
  medium: {
    fontFamily: FONTS.MEDIUM,
  },
  bold: {
    fontFamily: FONTS.BOLD,
  },
  extraBold: {
    fontFamily: FONTS.EXTRA_BOLD,
  },
  titleSmall: {
    fontSize: 18,
    lineHeight: 23,
    fontFamily: FONTS.MEDIUM,
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    fontFamily: FONTS.BOLD,
  },
  link: {
    color: BLUE.COMMON,
    fontFamily: FONTS.BOLD,
  },
  center: {
    textAlign: 'center',
  },
  subLine: {
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    color: GRAY.COMMON,
  },
  font10: {
    fontSize: 10,
  },
  font12: {
    fontSize: 12,
  },
  font18: {
    fontSize: 18,
  },
}

export function setDefaults({
  regular,
  medium,
  bold,
  extraBold,
  size,
  color,
}: SetDefaultFontsProps) {
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
