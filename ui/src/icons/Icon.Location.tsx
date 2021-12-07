import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { BLUE } from '../colors'

export default function LocationIcon({
  size = 16,
  color = BLUE.DEEP,
  style,
}: IconProps) {
  return (
    <Svg
      width={size}
      height={size * 1.25}
      viewBox="0 0 16 20"
      fill="none"
      style={style}
    >
      <Path
        d="M8 0C3.8 0 .383 3.417.383 7.617c0 2.712.825 3.799 4.788 9.024.688.907 1.468 1.935 2.36 3.125a.586.586 0 00.938 0c.887-1.184 1.663-2.208 2.348-3.111 3.973-5.24 4.8-6.331 4.8-9.038C15.617 3.417 12.2 0 8 0zm1.884 15.947c-.563.742-1.187 1.565-1.884 2.491-.702-.932-1.33-1.76-1.895-2.505-3.856-5.083-4.55-5.999-4.55-8.316A6.453 6.453 0 018 1.172a6.453 6.453 0 016.445 6.445c0 2.313-.696 3.231-4.561 8.33z"
        fill={color}
      />
      <Path
        d="M8 3.516a4.106 4.106 0 00-4.102 4.101A4.106 4.106 0 008 11.72a4.106 4.106 0 004.102-4.102A4.106 4.106 0 008 3.516zm0 7.03a2.933 2.933 0 01-2.93-2.929A2.933 2.933 0 018 4.687a2.933 2.933 0 012.93 2.93A2.933 2.933 0 018 10.547z"
        fill={color}
      />
    </Svg>
  )
}
