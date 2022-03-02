import { StyleSheet } from 'react-native'
import { BLUE } from '../colors'

export const multiSelectStyles = StyleSheet.create({
  emptyCard: {
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderColor: BLUE.BORDER,
    borderWidth: 1,
    minWidth: 45,
    textAlign: 'center',
    flex: 0,
    justifyContent: 'center',
  },
  button: {
    padding: 7,
    paddingHorizontal: 11,
    borderRadius: 12,
  },
  emptyCardSelected: {
    backgroundColor: BLUE.COMMON,
    borderColor: BLUE.COMMON,
    borderWidth: 1,
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
