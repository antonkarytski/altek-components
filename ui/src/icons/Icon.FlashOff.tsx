import React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import { IconProps } from './_types'
import { COMMON } from '../colors'

export default function FlashOffIcon({
  size = 22,
  color = COMMON.WHITE,
  style,
}: IconProps) {
  return (
    <Svg style={style} width={size} height={size} viewBox="0 0 20 20">
      <G stroke="none" strokeWidth={1} fill="none">
        <Path
          d="M9.273 0c-.42 0-.797.263-.941.658l-.88 2.426 4.622 4.623 2.801-6.3A1 1 0 0013.961 0H9.273zM1.697.535a1 1 0 00-.709 1.71l4.965 4.962-.89 2.451A1 1 0 006.002 11h3.744l.182.184L6.888 19c-.188.616-.032.981.602 1 .32 0 .623-.153.81-.412l4.223-5.809 5.551 5.55a.999.999 0 101.414-1.415L2.402.828a.991.991 0 00-.705-.293zM13.367 9l1.516 1.516c.4-.655-.059-1.516-.848-1.516h-.668z"
          fill={color}
          fillRule="nonzero"
        />
      </G>
    </Svg>
  )
}
