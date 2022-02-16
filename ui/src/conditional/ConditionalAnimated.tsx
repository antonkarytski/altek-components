import React, { ReactNode } from 'react'
import { Animated, View, ViewProps } from 'react-native'

type ConditionalAnimatedProps = { children: ReactNode } & (
  | ({ isAnimated?: false } & ViewProps)
  | ({ isAnimated: true } & Animated.AnimatedProps<ViewProps>)
)

export default function ConditionalAnimated({
  isAnimated,
  children,
  ...props
}: ConditionalAnimatedProps) {
  if (isAnimated) {
    return <Animated.View {...props}>{children}</Animated.View>
  }
  return <View {...(props as ViewProps)}>{children}</View>
}
