import { StyleProp, ViewStyle } from 'react-native'
import { BLACK, BLUE, COMMON, GRAY, GREEN, RED, YELLOW } from '../colors'

type Phrases = {
  pending: string
  completed: string
  rejected: string
}

export type ColorPreset = {
  label: (text: Phrases) => void
  wrapperStyle: StyleProp<ViewStyle>
  color: string
}
type PresetsName =
  | 'BLANK'
  | 'BLUE'
  | 'GREEN'
  | 'RED'
  | 'GRAY'
  | 'YELLOW'
  | 'WHITE'

export const COLOR_PRESET: Record<PresetsName, ColorPreset> = {
  BLANK: {
    label: () => '',
    color: GRAY.COMMON,
    wrapperStyle: {
      backgroundColor: COMMON.TRANSPARENT,
    },
  },
  WHITE: {
    label: () => '',
    color: BLACK.COMMON,
    wrapperStyle: {
      backgroundColor: COMMON.TRANSPARENT,
    },
  },
  BLUE: {
    label: (text: Phrases) => text.pending,
    color: BLUE.COMMON,
    wrapperStyle: {
      backgroundColor: BLUE.BODY,
    },
  },
  GREEN: {
    label: (text: Phrases) => text.completed,
    color: GREEN.TEXT,
    wrapperStyle: {
      backgroundColor: GREEN.BODY,
    },
  },
  RED: {
    label: (t: Phrases) => t.rejected,
    color: RED.TEXT,
    wrapperStyle: {
      backgroundColor: RED.BODY,
    },
  },
  GRAY: {
    label: () => '',
    color: GRAY.COMMON,
    wrapperStyle: {
      backgroundColor: GRAY.BODY,
    },
  },
  YELLOW: {
    label: () => '',
    color: YELLOW.COMMON,
    wrapperStyle: {
      backgroundColor: YELLOW.BODY,
    },
  },
}
