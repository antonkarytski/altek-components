import React, { FC, useRef } from 'react'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { StyleProp, ViewStyle } from 'react-native'

type ExpandablePartProps = {
  isInitiated: boolean
  animateValue: SharedValue<number>
  style?: StyleProp<ViewStyle>
}

const ExpandablePart: FC<ExpandablePartProps> = React.memo(
  ({ animateValue, isInitiated, children, style }) => {
    const height = useRef(0)
    const aStyle = useAnimatedStyle(() => {
      return {
        height: withTiming(animateValue.value * height.current, {
          duration: 300,
        }),
      }
    })

    return (
      <Animated.View
        onLayout={(e) => {
          if (height.current) return
          height.current = e.nativeEvent.layout.height
        }}
        style={[style, isInitiated ? aStyle : null]}
      >
        {children}
      </Animated.View>
    )
  }
)

export default ExpandablePart
