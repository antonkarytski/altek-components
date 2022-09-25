import React, { PropsWithChildren } from 'react'
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  ViewStyle,
  Platform,
  ViewProps,
} from 'react-native'

type SafeAreaProps = {
  style?: StyleProp<ViewStyle>
} & ViewProps

const SafeArea = ({ children, style }: PropsWithChildren<SafeAreaProps>) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  )
}

export default SafeArea

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
})
