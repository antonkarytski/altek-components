import { Animated } from 'react-native'

export const animationInterpolate = (
  value: Animated.Value,
  inputRange: number[],
  outputRange: number[] | string[],
  extrapolate?: 'clamp'
) => {
  if (value === undefined) {
    return 0
  }
  return value.interpolate({
    inputRange,
    outputRange,
    extrapolate,
  })
}

export const springAnimation = (
  value: Animated.Value | Animated.ValueXY,
  toValue: number | { x: number; y: number },
  tension: number,
  friction: number,
  useNativeDriver = true
) => {
  return Animated.spring(value, {
    toValue,
    tension,
    friction,
    useNativeDriver,
  })
}
