import React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import { IconProps } from './_types'
import { COMMON } from '../colors'

export default function CameraReverseIcon({
  size = 38,
  color = COMMON.WHITE,
  style,
}: IconProps) {
  return (
    <Svg style={style} width={size} height={(size / 4) * 3} viewBox="0 0 48 36">
      <G stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
        <Path
          d="M45 4l-8.957.008c-.277-.102-.852-1.024-1.164-1.516C34.109 1.266 33.316 0 32 0H16c-1.316 0-2.11 1.266-2.879 2.492C12.812 2.984 12.234 3.906 12 4H3C1.348 4 0 5.348 0 7v26c0 1.652 1.348 3 3 3h42c1.652 0 3-1.348 3-3V7c0-1.652-1.348-3-3-3zM30.687 27.434A9.964 9.964 0 0124 30c-5.516 0-10-4.484-10-10 0-.21.023-.414.04-.625l-1.642 1.64a1 1 0 11-1.414-1.413L15 15.586l4.016 4.016a1 1 0 11-1.414 1.414l-1.567-1.567c-.015.184-.035.367-.035.551 0 4.41 3.59 8 8 8a7.99 7.99 0 005.352-2.055 1 1 0 111.335 1.489zm6.329-8.067L33 23.383l-4.016-4.016a1 1 0 111.414-1.414l1.579 1.578C31.73 15.34 28.254 12 24 12a7.963 7.963 0 00-4.45 1.352 1.002 1.002 0 01-1.386-.274.999.999 0 01.27-1.387A9.963 9.963 0 0124 10c5.371 0 9.754 4.258 9.98 9.574l1.622-1.62a1 1 0 111.414 1.413z"
          fill={color}
          fillRule="nonzero"
        />
      </G>
    </Svg>
  )
}
