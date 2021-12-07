import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { BLACK } from '../colors'

export default function RightArrowIcon({
  color = BLACK.COMMON,
  style,
  size = 10,
}: IconProps) {
  return (
    <Svg
      style={style}
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill={color}
    >
      <Path d="M5.60745 4.64212L1.11049 0.146669C0.91317 -0.0501556 0.593474 -0.0501556 0.395653 0.146669C0.198329 0.343493 0.198329 0.663189 0.395653 0.860014L4.53591 4.99878L0.396152 9.13754C0.198828 9.33436 0.198828 9.65406 0.396152 9.85138C0.593475 10.0482 0.913668 10.0482 1.11099 9.85138L5.60794 5.35597C5.80224 5.16118 5.80224 4.83646 5.60745 4.64212Z" />
    </Svg>
  )
}
