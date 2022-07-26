import { StyleSheet } from 'react-native'
import { defaultValues } from '../styles'

export const cardModalStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
  },
  labelWrapper: {
    height: 41,
    justifyContent: 'center',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    paddingHorizontal: 14,
  },
  content: {
    padding: 16,
  },
})

export const submitModalStyles = StyleSheet.create({
  wrapper: {
    elevation: 200,
    zIndex: 200,
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    top: 0,
  },
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: defaultValues.paddingHorizontal,
  },
  modal: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
  },
  labelWrapper: {
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    height: 43,
    paddingVertical: 10,
    paddingLeft: 16,
  },
  label: {
    fontSize: 18,
    fontFamily: 'IBMPlex-600',
    lineHeight: 23,
  },
  content: {
    minHeight: 92,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  buttonWrapper: {
    borderTopColor: '#D3E5FB',
    borderTopWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 8,
    height: 39,
    minWidth: 57,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#A1A7AF',
    borderWidth: 1,
  },
  buttonLabel: {
    fontSize: 18,
    lineHeight: 23,
  },
  leftButtonLabel: {
    color: '#798293',
  },
})
