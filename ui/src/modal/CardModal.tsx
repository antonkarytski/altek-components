import React, { FC } from 'react'
import { Animated, View } from 'react-native'
import ColorHeader from '../colorHeader/ColorHeader'
import { CardModalProps } from './types'
import { COLOR_PRESET } from '../styles/presets'
import { cardModalStyles } from './styles'
import { shadowsStyles } from '../styles'

const CardModal: FC<CardModalProps> = ({
  children,
  preset = COLOR_PRESET.RED,
  title,
  style,
  onTouch,
}) => {
  return (
    <Animated.View
      onTouchStart={onTouch}
      style={[style, cardModalStyles.container, shadowsStyles.elevation5]}
    >
      {title ? (
        <ColorHeader
          styleOverride={cardModalStyles.labelWrapper}
          preset={preset}
          label={title}
        />
      ) : null}
      <View style={cardModalStyles.content}>{children}</View>
    </Animated.View>
  )
}

export default CardModal
