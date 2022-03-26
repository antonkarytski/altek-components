import React from 'react'
import Text from '../text'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { blueCardStyles } from './styles'
import { BLUE, GRAY } from '../colors'

type PriceAreaComponentProps = {
  value: string | number | undefined
  description: string
  style?: StyleProp<ViewStyle>
}

export default function PriceRateCard({
  value = 0,
  description,
  style,
}: PriceAreaComponentProps) {
  return (
    <View style={[blueCardStyles.card, styles.container, style]}>
      <Text bold style={styles.value} label={`$${value}`} />
      <Text medium style={styles.description} label={description} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingLeft: 12,
    paddingVertical: 15,
  },
  value: {
    fontSize: 18,
    color: BLUE.BORDER,
  },
  description: {
    fontSize: 12,
    marginTop: 6,
    color: GRAY.COMMON,
  },
})
