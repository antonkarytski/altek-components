import React from 'react'
import Svg, { ClipPath, Defs, G, Path } from 'react-native-svg'
import { IconProps } from './_types'

export default function FilesIcon({ style, size, color }: IconProps) {
  return (
    <Svg
      style={style}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
    >
      <G clipPath="url(#clip0)" fill={color}>
        <Path d="M18.27 4.809h-7.947L8.136 1.238a.577.577 0 00-.492-.276H1.731C.776.962 0 1.738 0 2.692v14.616c0 .954.776 1.73 1.73 1.73h16.54c.954 0 1.73-.776 1.73-1.73V6.54c0-.954-.776-1.73-1.73-1.73z" />
        <Path d="M18.269 3.655v-.193c0-.954-.777-1.73-1.731-1.73H9.79l1.178 1.923h7.3z" />
      </G>
      <Defs>
        <ClipPath id="clip0">
          <Path fill={color} d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}
