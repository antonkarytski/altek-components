import React, { PropsWithChildren } from 'react'
import { Animated, View } from 'react-native'
import SubmitModalInner, { SubmitModalInnerProps } from './SubmitModalInner'
import { overlayStyles } from '../styles'
import { submitModalStyles } from './styles'

type SubmitModalProps = {
  animStyle: any
} & SubmitModalInnerProps

export const SubmitModal = ({
  children,
  animStyle,
  ...props
}: PropsWithChildren<SubmitModalProps>) => {
  return (
    <Animated.View style={[submitModalStyles.wrapper, animStyle]}>
      <View style={overlayStyles.dark}>
        <SubmitModalInner {...props}>{children}</SubmitModalInner>
      </View>
    </Animated.View>
  )
}

export default SubmitModal
