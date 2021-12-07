import { BLACK, BLUE, GRAY } from '../colors'

const FONTS = {
  REGULAR: 'IBMPlex-400',
  MEDIUM: 'IBMPlex-500',
  BOLD: 'IBMPlex-600',
  EXTRA_BOLD: 'IBMPlex-700',
}

export const textStyles = {
  defaults: {
    color: BLACK.COMMON,
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
