import React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import { IconProps } from './_types'
import { COMMON } from '../colors'

export default function FlashOnIcon({
  size = 22,
  color = COMMON.WHITE,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 11 20">
      <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <Path
          d="M4.274 0h4.688a1 1 0 01.914 1.406L6.5 9h2.536a1 1 0 01.809 1.588l-6.545 9a1.001 1.001 0 01-.809.412c-.634-.019-.791-.384-.602-1L5 11H1.001a1 1 0 01-.94-1.342l3.273-9A1 1 0 014.274 0z"
          fill={color}
          fillRule="nonzero"
        />
      </G>
    </Svg>
  )
}
