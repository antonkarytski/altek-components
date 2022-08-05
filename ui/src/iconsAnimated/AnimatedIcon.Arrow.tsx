import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { ArrowTopIcon } from '../icons'

type AnimatedArrowIconProps = {
  animatedValue: Animated.SharedValue<number>
}

export default function AnimatedArrowIcon({
  animatedValue,
}: AnimatedArrowIconProps) {
  const dStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${180 - animatedValue.value * 180}deg` }],
  }))

  return (
    <Animated.View style={dStyle}>
      <ArrowTopIcon style={styles.arrow} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  arrow: { marginHorizontal: 6 },
})
