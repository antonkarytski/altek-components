import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LeftArrowIcon } from './index'

export const BackButton = () => {
  return (
    <View style={styles.container}>
      <LeftArrowIcon />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    padding: 5,
  },
})
