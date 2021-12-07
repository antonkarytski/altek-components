import { StyleSheet } from 'react-native'
import { BLUE } from '../colors'
import { shadowsStyles } from '../styles/shadows'
import { elementsStyles } from '../styles'

export const blueCardStyles = StyleSheet.create({
  card: {
    flex: 1,
    height: 70,
    backgroundColor: BLUE.BODY,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: BLUE.DEEP,
  },
})

export const cardsPresets = {
  common: [elementsStyles.card, shadowsStyles.elevation2],
  deep: [elementsStyles.card, shadowsStyles.elevation5],
}
