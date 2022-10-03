import React, { FC, PropsWithChildren } from 'react'
import {
  Keyboard,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import ConditionalKeyboardDismiss from '../conditional/ConditionalKeyboardDismiss'
import { Fn } from 'altek-toolkit'

export type ScreenWrapperProps = {
  style?: StyleProp<ViewStyle>
  disableKeyBoardClose?: boolean
  useKeyboardDismiss?: boolean
  backgroundColor?: string
  onTouch?: Fn
}

const ScreenWrapper = ({
  children,
  style,
  disableKeyBoardClose,
  useKeyboardDismiss: shouldDismissKeyboard,
  backgroundColor,
  onTouch,
}: PropsWithChildren<ScreenWrapperProps>) => {
  const closeKeyboard = () => {
    if (disableKeyBoardClose || shouldDismissKeyboard) return
    Keyboard.dismiss()
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ConditionalKeyboardDismiss isWrap={shouldDismissKeyboard}>
        <View
          onTouchStart={() => {
            onTouch?.()
            closeKeyboard()
          }}
          style={[styles.container, style]}
        >
          {children}
        </View>
      </ConditionalKeyboardDismiss>
    </SafeAreaView>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
})
