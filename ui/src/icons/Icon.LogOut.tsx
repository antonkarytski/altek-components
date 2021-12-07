import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { BLACK } from '../colors'

export default function LogOutIcon({
  size = 16,
  color = BLACK.COMMON,
  style,
}: IconProps) {
  return (
    <Svg
      style={style}
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        d="M9 16H1.667A1.669 1.669 0 010 14.333V1.667C0 .748.748 0 1.667 0H9c.919 0 1.667.748 1.667 1.667v4a.334.334 0 01-.667 0v-4c0-.552-.449-1-1-1H1.667c-.552 0-1 .448-1 1v12.666c0 .552.448 1 1 1H9c.551 0 1-.448 1-1v-4a.333.333 0 01.667 0v4C10.667 15.252 9.919 16 9 16z"
        fill={color}
      />
      <Path
        d="M15.667 8.334h-10a.333.333 0 010-.667h10a.334.334 0 010 .667z"
        fill={color}
      />
      <Path
        d="M13 11a.334.334 0 01-.236-.569l2.43-2.43-2.43-2.431a.334.334 0 01.472-.472l2.666 2.667c.13.13.13.341 0 .471l-2.666 2.667a.335.335 0 01-.237.098z"
        fill={color}
      />
    </Svg>
  )
}
