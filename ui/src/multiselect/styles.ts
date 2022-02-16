import { StyleSheet } from 'react-native'
import { BLUE } from '../colors'

export const multiSelectStyles = StyleSheet.create({
  emptyCard: {
    padding: 7,
    paddingHorizontal: 11,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderColor: BLUE.BORDER,
    borderWidth: 1,
    minWidth: 45,
    textAlign: 'center',
    flex: 0,
    justifyContent: 'center',
  },
  emptyCardSelected: {
    backgroundColor: BLUE.COMMON,
    borderWidth: 0,
  },
  emptyCardSelectedText: {
    color: 'white',
  },
  filledCard: {
    backgroundColor: BLUE.BODY,
    paddingVertical: 6,
    paddingLeft: 8,
    paddingRight: 5,
    borderRadius: 6,
  },
  cardText: {
    color: BLUE.COMMON,
  },
})
