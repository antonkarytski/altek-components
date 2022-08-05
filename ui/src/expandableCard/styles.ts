import { StyleSheet } from 'react-native'
import { GRAY } from '../colors'

const CONTENT_PADDING = 22

export const expandableCardStyles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  openButtonContainer: {
    borderColor: GRAY.BORDER,
  },
  openButton: {
    paddingHorizontal: CONTENT_PADDING,
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  nonExpandableBody: {
    paddingBottom: 20,
  },
  part: { paddingHorizontal: CONTENT_PADDING, overflow: 'hidden' },
  expandButton: {
    padding: 20,
  },
  // openButton: {
  //   borderColor: GRAY.BORDER,
  // },
  // openButtonInner: {
  //   paddingHorizontal: 22,
  //   paddingVertical: 15,
  //   alignItems: 'center',
  //   flexDirection: 'row',
  // },
  // contentWrapper: {
  //   borderRadius: 0,
  //   paddingHorizontal: 22,
  // },
  // bottomBorderRadius: {
  //   borderBottomLeftRadius: 8,
  //   borderBottomRightRadius: 8,
  // },
  // showMoreButton: {
  //   backgroundColor: '#fff',
  // },
  // showMoreButtonInner: {
  //   padding: 20,
  // },
  // mainBlock: {
  //   paddingVertical: 20,
  // },
  // mainBlockExpandable: {
  //   paddingTop: 15,
  // },
})
