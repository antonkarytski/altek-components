import React, { FC } from 'react'
import { StyleProp, ViewStyle, View, StyleSheet } from 'react-native'
import { shadowsStyles } from '../styles'
import { COMMON } from '../colors'

type CardProps = {
  style?: StyleProp<ViewStyle>
  shadowStyle?: ViewStyle
}

const Card: FC<CardProps> = ({ children, style, shadowStyle }) => {
  return (
    <View
      style={[styles.container, shadowStyle ?? shadowsStyles.elevation2, style]}
    >
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COMMON.WHITE,
    borderRadius: 6,
    justifyContent: 'center',
  },
})
