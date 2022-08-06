import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { swipeContainerStyles } from './styles'

type SwipeLineProps = {
  style?: StyleProp<ViewStyle>
}

export const SwipeLine = ({ style }: SwipeLineProps) => {
  return <View style={[swipeContainerStyles.swipeLine, style]} />
}
