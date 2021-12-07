import React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'
import { IconProps } from './_types'
import { GRAY } from '../colors'

export default function ChatIcon({
  color = GRAY.COMMON,
  size = 19,
  style,
}: IconProps) {
  return (
    <Svg
      style={style}
      width={size}
      height={size}
      viewBox="0 0 17 17"
      fill="none"
    >
      <G clipPath="url(#clip0)">
        <Path
          d="M14.504 2.49A8.439 8.439 0 008.495 0a8.438 8.438 0 00-6.01 2.49C-.62 5.597-.834 10.568 1.95 13.92c-.273.55-.711 1.19-1.362 1.51a.797.797 0 00.23 1.502c.162.025.392.05.672.05.751 0 1.858-.176 2.99-.992a8.499 8.499 0 0010.027-1.48A8.438 8.438 0 0017 8.5a8.442 8.442 0 00-2.495-6.01zm-.686 11.333a7.528 7.528 0 01-9.136 1.171.483.483 0 00-.59.076.16.16 0 00-.04.029c-.973.755-1.93.913-2.562.913h-.003c.73-.532 1.19-1.323 1.459-1.938a.496.496 0 00.025-.312.505.505 0 00-.119-.273A7.537 7.537 0 013.17 3.177c2.936-2.936 7.713-2.936 10.645 0a7.53 7.53 0 01.004 10.646z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Path fill="none" d="M0 0H17V17H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
