import { StyleSheet } from 'react-native'
import { GRAY } from '../colors'

export const swipeContainerStyles = StyleSheet.create({
  container: {
    backgroundColor: GRAY.SCREEN_BACKGROUND,
    paddingTop: 0,
    paddingBottom: 12,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: '#F2F2F2',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 4,
  },
  content: {
    justifyContent: 'space-between',
    width: '100%',
  },
  swipeLineWrapper: {
    paddingTop: 12,
    paddingBottom: 20,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  swipeLine: {
    backgroundColor: GRAY.LIGHT,
    width: 58,
    height: 4,
    borderRadius: 5,
    alignSelf: 'center',
  },
})
