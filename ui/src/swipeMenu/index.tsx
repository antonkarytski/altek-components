import React, { FC } from 'react'
import { Animated, StyleProp, View, ViewStyle } from 'react-native'
import { SwipeLine } from './SwipeLine'
import { AnimatedModel } from 'altek-toolkit'
import { useSwipeController } from './hook'
import { swipeContainerStyles } from './styles'

type SwipeMenuProps = {
  style?: StyleProp<ViewStyle>
  swipeLineStyle?: StyleProp<ViewStyle>
  model: AnimatedModel
}

const SwipeMenu: FC<SwipeMenuProps> = ({
  children,
  model,
  style,
  swipeLineStyle,
}) => {
  const controller = useSwipeController(model)

  return (
    <Animated.View
      style={[controller.animatedStyle, swipeContainerStyles.container, style]}
    >
      <Animated.View
        {...controller.panHandlers}
        style={swipeContainerStyles.swipeLineWrapper}
      >
        <SwipeLine style={swipeLineStyle} />
      </Animated.View>
      <View style={swipeContainerStyles.content}>{children}</View>
    </Animated.View>
  )
}

export default SwipeMenu
