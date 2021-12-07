import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { GRAY } from '../colors'

export default function SendIcon({
  size = 25,
  color = GRAY.COMMON,
}: IconProps) {
  return (
    <Svg width={size * 1.2} height={25} viewBox="0 0 18 14" fill="none">
      <Path
        d="M17.114 6.289a.447.447 0 00-.313-.398L.969.436a.528.528 0 00-.523.105.419.419 0 00-.11.477l2.497 5.839-2.026 6.019a.418.418 0 00.148.467c.147.115.355.14.53.063L16.834 6.71a.447.447 0 00.28-.421zM1.651 1.628l12.568 4.33-10.537.419-2.03-4.75zm.42 10.536l1.647-4.896 10.536-.42L2.07 12.165z"
        fill={color}
      />
    </Svg>
  )
}
