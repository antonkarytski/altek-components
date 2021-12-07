import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { IconProps } from './_types'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faAngleDoubleLeft,
  faAngleLeft,
  faArrowLeft,
  faCaretLeft,
  faChevronLeft,
  faLongArrowAltLeft,
} from '@fortawesome/free-solid-svg-icons'
import { BLACK } from '../colors'

type ArrowDriver =
  | 'arrow'
  | 'chevron'
  | 'longArrow'
  | 'angle'
  | 'double'
  | 'caret'
  | 'svg'

export type LeftArrowProps = {
  driver?: ArrowDriver
} & IconProps

const arrowsMap: {
  [key in Exclude<ArrowDriver, 'svg'>]: typeof faArrowLeft
} = {
  arrow: faArrowLeft,
  chevron: faChevronLeft,
  longArrow: faLongArrowAltLeft,
  angle: faAngleLeft,
  double: faAngleDoubleLeft,
  caret: faCaretLeft,
}

export default function LeftArrow({
  size = 8,
  style,
  color = BLACK.COMMON,
  driver = 'svg',
}: LeftArrowProps) {
  if (driver === 'svg') {
    return (
      <Svg
        width={size}
        height={size * 1.5}
        viewBox="0 0 8 12"
        fill="none"
        style={style}
      >
        <Path
          d="M.872 6.43l5.396 5.394c.237.236.62.236.858 0a.605.605 0 000-.856L2.158 6l4.967-4.966a.605.605 0 10-.858-.857L.871 5.573a.611.611 0 000 .856z"
          fill={color}
        />
      </Svg>
    )
  }

  const arrow = arrowsMap[driver]
  return <FontAwesomeIcon icon={arrow} size={size} color={color} />
}
