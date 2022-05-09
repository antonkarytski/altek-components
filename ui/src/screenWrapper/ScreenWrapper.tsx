import React, { FC } from 'react'
import { Keyboard, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import SafeArea from './SafeArea'
import ConditionalKeyboardDismiss from '../conditional/ConditionalKeyboardDismiss'
import { GRAY } from '../colors'
import { Fn } from 'altek-toolkit'

type ScreenWrapperProps = {
  style?: StyleProp<ViewStyle>
  disableKeyBoardClose?: boolean
  useKeyboardDismiss?: boolean
  onTouch?: Fn
}

const ScreenWrapper: FC<ScreenWrapperProps> = ({
  children,
  style,
  disableKeyBoardClose,
  useKeyboardDismiss: shouldDismissKeyboard,
  onTouch,
}) => {
  const closeKeyboard = () => {
    if (disableKeyBoardClose || shouldDismissKeyboard) return
    Keyboard.dismiss()
  }

  return (
    <SafeArea>
      <ConditionalKeyboardDismiss isWrap={shouldDismissKeyboard}>
        <View
          onTouchStart={() => {
            if (onTouch) onTouch()
            closeKeyboard()
          }}
          style={[styles.container, style]}
        >
          {children}
        </View>
      </ConditionalKeyboardDismiss>
    </SafeArea>
  )
}

export default ScreenWrapper

const styles = StyleSheet.create({
  container: {
    backgroundColor: GRAY.SCREEN_BACKGROUND,
    height: '100%',
  },
})
