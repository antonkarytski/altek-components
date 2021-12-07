import { StyleSheet } from 'react-native'
import { GRAY } from '../colors'

export const expandableCardStyles = StyleSheet.create({
  openButton: {
    borderColor: GRAY.BORDER,
  },
  openButtonInner: {
    paddingHorizontal: 22,
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentWrapper: {
    borderRadius: 0,
    paddingHorizontal: 22,
  },
  bottomBorderRadius: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  showMoreButton: {
    backgroundColor: '#fff',
  },
  showMoreButtonInner: {
    padding: 20,
  },
  mainBlock: {
    paddingVertical: 20,
  },
  mainBlockExpandable: {
    paddingTop: 15,
  },
})
