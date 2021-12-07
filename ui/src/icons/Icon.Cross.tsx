import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { BLACK } from '../colors'

export default function CrossIcon({
  size = 9,
  color = BLACK.COMMON,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <Path
        d="M8.664,7l4.992-4.992A1.177,1.177,0,0,0,11.992.344L7,5.336,2.009.344A1.177,1.177,0,0,0,.345,2.008L5.336,7,.345,11.991a1.177,1.177,0,1,0,1.664,1.664L7,8.663l4.992,4.992a1.177,1.177,0,0,0,1.664-1.664Z"
        fill={color}
      />
    </Svg>
  )
}
