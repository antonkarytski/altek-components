import React, { FC } from 'react'
import { StyleProp, ViewStyle, View, StyleSheet } from 'react-native'
import { shadowsStyles } from '../styles'

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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    justifyContent: 'center',
  },
})
