import React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'
import { IconProps } from './_types'
import { COMMON } from '../colors'

export default function GalleryIcon({
  color = COMMON.WHITE,
  size = 22,
  style,
}: IconProps) {
  return (
    <Svg
      style={style}
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
    >
      <G clipPath="url(#clip0)" fill={color}>
        <Path d="M8.827 11.302a3.196 3.196 0 100-6.393 3.196 3.196 0 000 6.393z" />
        <Path d="M19.64 2.265H2.36A2.363 2.363 0 000 4.625v12.748a2.363 2.363 0 002.36 2.36h17.28a2.363 2.363 0 002.36-2.36V4.625a2.363 2.363 0 00-2.36-2.36zm-17.28.944h17.28c.781 0 1.415.634 1.416 1.416v9.309L18.23 9.93a2.361 2.361 0 00-3.833-.033l-3.216 4.39c-.447.613-1.3.763-1.93.34l-2.404-1.61a2.356 2.356 0 00-2.613-.008l-3.29 2.192V4.625c0-.781.634-1.415 1.416-1.416z" />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Path fill={color} d="M0 0H22V22H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
