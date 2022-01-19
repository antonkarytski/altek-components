import { StyleSheet } from 'react-native'
import { GRAY } from '../colors'

export const bigButtonStyles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 24,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  label: {
    fontSize: 18,
    lineHeight: 23,
  },
})
export const textButtonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export const sendButtonStyles = StyleSheet.create({
  sendWrapper: {
    width: 30,
  },
})

export const floatButtonStyles = StyleSheet.create({
  bottomButton: {
    marginTop: 'auto',
    marginBottom: 16,
  },
})
export const fontAwesomeButtonStyles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  activeButton: {
    backgroundColor: GRAY.COMMON,
  },
})
