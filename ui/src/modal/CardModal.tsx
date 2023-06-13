import React, { PropsWithChildren } from 'react'
import { Animated, View } from 'react-native'
import ColorHeader from '../colorHeader/ColorHeader'
import { CardModalProps } from './types'
import { COLOR_PRESET } from '../styles/presets'
import { cardModalStyles } from './styles'
import { shadowsStyles } from '../styles'

const CardModal = ({
  children,
  preset = COLOR_PRESET.RED,
  title,
  style,
  onTouch,
  animatedStyle,
}: PropsWithChildren<CardModalProps>) => {
  return (
    <Animated.View
      onTouchStart={onTouch}
      style={[
        cardModalStyles.container,
        shadowsStyles.elevation5,
        style?.container,
        animatedStyle,
      ]}
    >
      {title ? (
        <ColorHeader
          styleOverride={[cardModalStyles.labelWrapper, style?.header]}
          preset={preset}
          label={title}
        />
      ) : null}
      <View style={[cardModalStyles.part, style?.contentWrapper]}>
        {children}
      </View>
    </Animated.View>
  )
}

export default CardModal
