import React, { FC, useRef, useState } from 'react'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { StyleProp, ViewStyle } from 'react-native'

type ExpandablePartProps = {
  animateValue: SharedValue<number>
  style?: StyleProp<ViewStyle>
  onLayout?: () => void
}

const ExpandablePart: FC<ExpandablePartProps> = React.memo(
  ({ animateValue, children, style }) => {
    const [isInitiated, setIsInitiated] = useState(false)
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
          if (isInitiated) return
          height.current = e.nativeEvent.layout.height
          setIsInitiated(true)
        }}
        style={[style, isInitiated ? aStyle : null]}
      >
        {children}
      </Animated.View>
    )
  }
)

export default ExpandablePart
