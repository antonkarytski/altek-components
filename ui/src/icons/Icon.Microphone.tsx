import React from 'react'
import { IconProps } from './_types'
import Svg, { G, Path } from 'react-native-svg'
import { GRAY } from '../colors'

export default function MicrophoneIcon({
  size = 27,
  color = GRAY.COMMON,
  style,
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="-249 151 100 100"
      fill="none"
      style={style}
    >
      <G>
        <Path
          d="M-199.5,218.9c9.7,0,17.6-7.9,17.6-17.6v-1.8v-29.4c0-9.9-7.7-17.6-17.6-17.6c-9.7,0-17.6,7.9-17.6,17.6v29.4v1.8
		C-217.1,211-209.2,218.9-199.5,218.9z M-212.1,199.5v-29.4c0-6.9,5.6-12.6,12.6-12.6c7.1,0,12.6,5.5,12.6,12.6v29.4v1.8
		c0,6.9-5.6,12.6-12.6,12.6s-12.6-5.6-12.6-12.6V199.5z"
          fill={color}
        />
        <Path
          d="M-173.8,199.5L-173.8,199.5c-1.3,0-2.3,1-2.5,2.2c-1.4,11.5-10.4,20.4-21.6,21c-6.5,0.4-12.7-1.8-17.5-6.2
		c-4.2-3.8-6.8-9.1-7.4-14.7c-0.1-1.3-1.2-2.3-2.5-2.3c-1.5,0-2.6,1.3-2.5,2.8c0.7,6.9,3.9,13.3,9,17.9c4.7,4.4,10.5,7,16.8,7.5v17
		h-8.6c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5h22.2c1.4,0,2.5-1.1,2.5-2.5s-1.1-2.5-2.5-2.5h-8.6v-17c13.4-1,24-11.8,25.7-25.4
		C-171.2,200.8-172.3,199.5-173.8,199.5z"
          fill={color}
        />
      </G>
    </Svg>
    // <Feather
    //   name="mic"
    //   size={size || 27}
    //   color={color || '#5B5B5B'}
    //   style={style}
    // />
  )
}
