import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { GRAY } from '../colors'

export default function BidsIcon({
  color = GRAY.COMMON,
  size = 19,
  style,
}: IconProps) {
  return (
    <Svg
      style={style}
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
    >
      <Path
        d="M15.357 2.643A8.936 8.936 0 009 0a8.936 8.936 0 00-6.357 2.643A8.936 8.936 0 000 9c0 2.395.939 4.652 2.643 6.357A8.936 8.936 0 009 18a8.936 8.936 0 006.357-2.643A8.936 8.936 0 0018 9a8.936 8.936 0 00-2.643-6.357zM9 16.945c-4.381 0-7.945-3.564-7.945-7.945S4.619 1.055 9 1.055 16.945 4.619 16.945 9 13.381 16.945 9 16.945z"
        fill={color}
      />
      <Path
        d="M10.582 7.412a.527.527 0 001.055 0c0-.584-.302-1.145-.83-1.54-.359-.27-.802-.45-1.28-.527v-.57a.527.527 0 00-1.054 0v.57c-.479.077-.921.257-1.281.527-.527.395-.829.956-.829 1.54 0 .584.302 1.146.829 1.54.36.27.802.45 1.28.527v2.089c-.607-.148-1.054-.543-1.054-.992a.527.527 0 00-1.055 0c0 .584.302 1.146.829 1.54.36.27.802.45 1.28.527v.575a.527.527 0 001.055 0v-.575c.479-.076.921-.256 1.28-.526.528-.395.83-.957.83-1.54 0-.585-.302-1.146-.83-1.541-.359-.27-.802-.45-1.28-.527V6.42c.608.149 1.055.543 1.055.992zm-3.164 0c0-.449.447-.843 1.055-.992v1.984c-.608-.148-1.055-.543-1.055-.992zm3.164 3.164c0 .45-.447.844-1.055.992V9.584c.608.149 1.055.543 1.055.992z"
        fill={color}
      />
    </Svg>
  )
}
