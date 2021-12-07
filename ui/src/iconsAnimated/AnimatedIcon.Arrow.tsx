import React from 'react'
import { StyleSheet } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { ArrowTopIcon } from '../icons'

type AnimatedArrowIconProps = {
  rotation: Animated.SharedValue<number>
}

export default function AnimatedArrowIcon({
  rotation,
}: AnimatedArrowIconProps) {
  const dStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${180 - rotation.value}deg` }],
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
