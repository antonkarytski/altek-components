import { StyleSheet } from 'react-native'
import { BLUE } from '../colors'
import { elementsStyles, shadowsStyles } from '../styles'

export const blueCardStyles = StyleSheet.create({
  card: {
    flex: 1,
    height: 70,
    backgroundColor: BLUE.BODY,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export const cardsPresets = {
  common: [elementsStyles.card, shadowsStyles.elevation2],
  deep: [elementsStyles.card, shadowsStyles.elevation5],
}
