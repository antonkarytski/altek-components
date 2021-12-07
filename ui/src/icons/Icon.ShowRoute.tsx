import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { GRAY } from '../colors'

export default function ShowRouteIcon({
  color = GRAY.COMMON,
  size = 14,
  style,
}: IconProps) {
  return (
    <Svg
      style={style}
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
    >
      <Path
        d="M13.877.128l-.003-.003-.005-.005a.41.41 0 00-.434-.093L.27 5.009a.41.41 0 00-.017.76l5.588 2.395 2.395 5.588a.41.41 0 00.377.248h.009a.41.41 0 00.374-.265L13.931.64a.41.41 0 00-.054-.513zM1.511 5.416l10.456-3.957L6.06 7.365l-4.55-1.95zm7.078 7.076L6.641 7.946l5.876-5.878L8.59 12.492z"
        fill={color}
      />
    </Svg>
  )
}
