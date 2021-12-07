import React from 'react'
import Text from '../text'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { blueCardStyles } from './styles'

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
      <Text bold style={[blueCardStyles.text, styles.value]}>
        ${value}
      </Text>
      <Text medium style={[blueCardStyles.text, styles.description]}>
        {description}
      </Text>
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
  },
  description: {
    fontSize: 12,
    marginTop: 6,
  },
})
