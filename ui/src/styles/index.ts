import { StyleSheet } from 'react-native'
import { BLUE, GRAY } from '../colors'

export const defaultValues = {
  paddingHorizontal: 16,
}

export const overlayStyles = StyleSheet.create({
  dark: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
})

export const elementsStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: defaultValues.paddingHorizontal,
  },
  row: {
    flexDirection: 'row',
  },
  verticalLine: {
    borderLeftWidth: 1,
    flex: 1,
    width: 1,
    borderColor: BLUE.COMMON,
  },
  card: {
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '100%',
  },
})

export const listStyles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: GRAY.BODY,
  },
  contentContainer: {
    paddingHorizontal: 13,
    paddingTop: 14,
  },
  screenList: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: defaultValues.paddingHorizontal,
  },
})

export { shadowsStyles } from './shadows'
