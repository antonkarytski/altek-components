import React from 'react'
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  ViewStyle,
  Platform,
} from 'react-native'

type SafeAreaProps = {
  style?: StyleProp<ViewStyle>
}
const SafeArea: React.FC<SafeAreaProps> = ({ children, style }) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        Platform.OS === 'ios' ? styles.iosPadding : null,
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  )
}

export default SafeArea

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  iosPadding: {
    paddingBottom: 20,
  },
})
