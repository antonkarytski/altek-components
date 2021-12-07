import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { BLUE } from '../colors'

export default function ArrowTopIcon({
  style,
  color = BLUE.COMMON,
  size = 5,
}: IconProps) {
  return (
    <Svg
      width={size * 1.2}
      height={size}
      style={style}
      viewBox="0 0 6 5"
      fill="none"
    >
      <Path d="M3 0l2.598 4.5H.402L3 0z" fill={color} />
    </Svg>
  )
}
