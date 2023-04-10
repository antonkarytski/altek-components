import React from 'react'
import { Image, Modal, StyleSheet, View } from 'react-native'
import BackButton from '../buttons/Button.Back'
import SendButton from '../buttons/Button.Send'
import { EditorProps } from './types'
import { commonEditorStyles } from './styles'

export default function SubmitEditor({ onAccept, onCancel, uri, style }: EditorProps) {
  return (
    <View style={[StyleSheet.absoluteFill, style]}>
      <Image style={styles.preview} source={{ uri }} />
      <BackButton style={commonEditorStyles.backButton} onPress={onCancel} />
      <SendButton
        style={commonEditorStyles.sendButton}
        onPress={onAccept}
        color={'#FFF'}
        size={30}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
  },
  preview: {
    flex: 1,
  },
})
