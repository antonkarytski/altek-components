import React, { FC } from 'react'
import { StyleProp, ViewStyle, View, StyleSheet } from 'react-native'
import { shadowsStyles } from '../styles'
import { COMMON } from '../colors'

type WhiteCardProps = {
  style?: StyleProp<ViewStyle>
  shadowStyle?: ViewStyle
}

const WhiteCard: FC<WhiteCardProps> = ({ children, style, shadowStyle }) => {
  return (
    <View
      style={[styles.container, shadowStyle ?? shadowsStyles.elevation2, style]}
    >
      {children}
    </View>
  )
}

export default WhiteCard

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COMMON.WHITE,
    borderRadius: 6,
    justifyContent: 'center',
  },
})
