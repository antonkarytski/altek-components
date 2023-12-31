import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { GRAY } from '../colors'

export default function AttachIcon({
  size = 25,
  color = GRAY.ICON,
}: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M10.844 4.684l-.672-.672-5.512 5.51a1.758 1.758 0 000 2.484 1.758 1.758 0 002.483 0l7.402-7.402c.51-.51.79-1.187.79-1.907s-.28-1.398-.79-1.907A2.68 2.68 0 0012.638 0c-.72 0-1.398.28-1.907.79l-9 9a3.614 3.614 0 00-1.065 2.572c0 .972.378 1.885 1.066 2.572A3.614 3.614 0 004.304 16c.972 0 1.886-.378 2.573-1.066l7.109-7.108-.673-.672-7.108 7.108a2.67 2.67 0 01-1.9.787 2.67 2.67 0 01-1.901-.787 2.67 2.67 0 01-.787-1.9c0-.718.28-1.393.787-1.9l9-9c.68-.68 1.788-.68 2.469 0 .68.68.68 1.789 0 2.47L6.47 11.333a.806.806 0 01-1.138-1.138l5.51-5.511z"
        fill={color}
      />
    </Svg>
  )
}
