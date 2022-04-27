import React, { FC } from 'react'
import { Keyboard, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import SafeArea from './SafeArea'
import ConditionalKeyboardDismiss from '../conditional/ConditionalKeyboardDismiss'
import { GRAY } from '../colors'

type ScreenWrapperProps = {
  safeAreaStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  isEnabledHeightController?: boolean
  disableKeyBoardClose?: boolean
  useKeyboardDismiss?: boolean
  onTouch?: () => void
}

const ScreenWrapper: FC<ScreenWrapperProps> = ({
  children,
  safeAreaStyle,
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
    <SafeArea style={safeAreaStyle}>
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
