import { Animated } from 'react-native'
import { animationInterpolate } from 'altek-toolkit'
import { AdditionalProps } from './types.model'

export const noop = () => {}

export function getPopUpAnimatedStyles(animatedValue: Animated.Value) {
  const modalInterpolateY = animationInterpolate(
    animatedValue,
    [0, 1],
    [-500, 0]
  )
  const opacityInterpolate = animationInterpolate(animatedValue, [0, 1], [0, 1])

  return {
    opacity: {
      opacity: opacityInterpolate,
    },
    yMove: {
      transform: [{ translateY: modalInterpolateY }],
    },
  }
}
