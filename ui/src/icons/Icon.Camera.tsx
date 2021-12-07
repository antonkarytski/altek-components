import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { BLUE } from '../colors'

export default function CameraIcon({
  color = BLUE.COMMON,
  size = 26,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 26 26" fill="none">
      <Path
        d="M22.75 4.875h-2.438L19.5 3.25c-.479-.946-.727-1.625-1.625-1.625h-9.75c-.898 0-1.194.775-1.625 1.625l-.813 1.625H3.25A3.25 3.25 0 000 8.125v13a3.25 3.25 0 003.25 3.25h19.5a3.25 3.25 0 003.25-3.25v-13a3.25 3.25 0 00-3.25-3.25zM13 21.125a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"
        fill={color}
      />
      <Path
        d="M13 9.75a4.875 4.875 0 100 9.75 4.875 4.875 0 000-9.75z"
        fill={color}
      />
    </Svg>
  )
}
