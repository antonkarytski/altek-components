import { Platform, StyleSheet } from 'react-native'
import { multiSelectStyles } from '../styles'

const styles = StyleSheet.create({
  listItemEmpty: {
    flexDirection: 'column',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkbox: {
    marginRight: Platform.OS === 'ios' ? 5 : 0,
  },
  listItemTextWrap: {
    flex: 1,
    paddingVertical: 5,
  },
  text: {
    textAlign: 'center',
    width: '100%',
  },
  textWrap: {
    padding: 7,
    paddingHorizontal: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export const emptyListItemStyles = {
  item: [multiSelectStyles.emptyCard, styles.listItemEmpty],
  selected: multiSelectStyles.emptyCardSelected,
  textWrap: [multiSelectStyles.button, styles.textWrap],
  text: [multiSelectStyles.cardText, styles.text],
  textSelected: multiSelectStyles.emptyCardSelectedText,
}
