import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { GRAY } from '../colors'

export default function TruckIcon({
  size = 19,
  color = GRAY.COMMON,
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
      <Path
        d="M16.885 3.34a2.486 2.486 0 00-.303-.632L15.22.665A1.49 1.49 0 0013.977 0H3.023c-.5 0-.965.249-1.243.665L.418 2.708A2.488 2.488 0 000 4.09v11.416C0 16.33.67 17 1.494 17h14.012C16.33 17 17 16.33 17 15.506V4.09c0-.257-.04-.509-.115-.75zM8.998.996h4.979c.167 0 .322.083.414.222l1.18 1.77H8.998V.996zm-6.39.222a.497.497 0 01.415-.222h4.979v1.992H1.429l1.18-1.77zm13.396 14.288a.499.499 0 01-.498.498H1.494a.499.499 0 01-.498-.498C.996 3.37.994 4.066 1 3.984h15c.006.08.004-.627.004 11.522z"
        fill={color}
      />
    </Svg>
  )
}
