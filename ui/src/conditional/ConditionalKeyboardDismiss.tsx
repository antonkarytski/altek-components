import React, { ReactElement } from 'react'
import {
  Keyboard,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native'

type ConditionalTouchableWithoutFeedbackProps = {
  isWrap: boolean | undefined | null
  children: ReactElement
} & TouchableWithoutFeedbackProps

export default function ConditionalKeyboardDismiss({
  children,
  isWrap,
  onPress,
  ...props
}: ConditionalTouchableWithoutFeedbackProps) {
  if (isWrap) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} {...props}>
        {children}
      </TouchableWithoutFeedback>
    )
  }
  return children
}
