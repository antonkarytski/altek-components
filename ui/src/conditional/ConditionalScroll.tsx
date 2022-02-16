import React, { ReactNode } from 'react'
import { ScrollView, ScrollViewProps, View } from 'react-native'

type ConditionalScrollProps = {
  children: ReactNode
  isScroll?: boolean
} & ScrollViewProps

export default function ConditionalScroll({
  isScroll,
  children,
  ...props
}: ConditionalScrollProps) {
  if (isScroll) {
    return <ScrollView {...props}>{children}</ScrollView>
  }
  return <View {...props}>{children}</View>
}
