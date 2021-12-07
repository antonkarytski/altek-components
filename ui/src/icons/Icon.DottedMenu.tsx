import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { GRAY } from '../colors'

export default function DottedMenuIcon({
  size = 28,
  color = GRAY.COMMON,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 6 18" fill="none">
      <Path
        d="M5.25 2.25a2.25 2.25 0 10-4.5 0 2.25 2.25 0 004.5 0zm-3.375 0a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM5.25 15.75a2.25 2.25 0 10-4.5 0 2.25 2.25 0 004.5 0zm-3.375 0a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM5.25 9.001a2.25 2.25 0 10-4.5 0 2.25 2.25 0 004.5 0zm-3.375 0a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
        fill={color}
      />
    </Svg>
  )
}
