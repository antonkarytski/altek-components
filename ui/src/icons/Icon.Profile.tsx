import React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'
import { IconProps } from './_types'
import { GRAY } from '../colors'

export default function ProfileSVG({
  style,
  color = GRAY.COMMON,
  size = 19,
}: IconProps) {
  return (
    <Svg
      style={style}
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
    >
      <G clipPath="url(#clip0)">
        <Path
          d="M15.364 2.636A8.941 8.941 0 009 0a8.941 8.941 0 00-6.364 2.636A8.941 8.941 0 000 9c0 2.404.936 4.664 2.636 6.364A8.941 8.941 0 009 18a8.942 8.942 0 006.364-2.636A8.942 8.942 0 0018 9a8.941 8.941 0 00-2.636-6.364zM4.512 15.553A4.544 4.544 0 019 11.787a4.544 4.544 0 014.488 3.766A7.9 7.9 0 019 16.945a7.9 7.9 0 01-4.488-1.392zM6.138 7.87A2.865 2.865 0 019 5.01a2.865 2.865 0 012.862 2.861A2.865 2.865 0 019 10.732 2.865 2.865 0 016.138 7.87zm8.264 6.951a5.606 5.606 0 00-3.268-3.668 3.916 3.916 0 001.782-3.283A3.92 3.92 0 009 3.954 3.92 3.92 0 005.084 7.87c0 1.373.71 2.583 1.782 3.283a5.607 5.607 0 00-3.268 3.668A7.925 7.925 0 011.055 9c0-4.381 3.564-7.945 7.945-7.945S16.945 4.619 16.945 9c0 2.297-.98 4.37-2.543 5.821z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Path fill={color} d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
