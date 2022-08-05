import { StyleSheet } from 'react-native'

export const stepStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  marks: {
    height: '100%',
  },
  line: {
    marginLeft: 10,
  },
  contentContainer: {
    marginLeft: 5,
  },
})

export const stepsStyles = StyleSheet.create({
  container: {
    width: '60%',
  },

  step: {
    marginBottom: 20,
  },
})

export const horizontalStepsStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  helpers: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  contentWrap: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  part: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})
