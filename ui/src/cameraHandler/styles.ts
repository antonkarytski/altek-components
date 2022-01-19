import { Dimensions, StyleSheet } from 'react-native'
import { BLUE } from '../colors'

const { width } = Dimensions.get('window')

export const commonEditorStyles = StyleSheet.create({
  sendButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: BLUE.BORDER,
    right: 20,
    zIndex: 100,
    elevation: 1,
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 0,
  },
  backButton: {
    position: 'absolute',
  },
})

export const avatarEditorStyles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  animatedContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  mask: {
    backgroundColor: '#00000066',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: width * 0.9,
    height: width * 0.9,
    alignSelf: 'center',
    borderRadius: 1000,
    backgroundColor: 'white',
  },
  image: {
    resizeMode: 'contain',
    alignSelf: 'flex-start',
  },
})
