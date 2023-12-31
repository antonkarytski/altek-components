import React from 'react'
import {
  Modal,
  ModalProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { MultiSelectListProps } from '../types'
import CheckboxItemsList from '../list.checkbox/CheckboxItemsList'

export type ModalListProps<V extends string, L extends string> = {
  onBgClick: () => void
} & ModalProps &
  Omit<MultiSelectListProps<V, L>, 'type'>

export default function ModalList<V extends string, L extends string>({
  data,
  onBgClick,
  onItemSelect,
  onRequestClose,
}: ModalListProps<V, L>) {
  return (
    <Modal
      style={styles.background}
      transparent={true}
      onRequestClose={onRequestClose}
    >
      <TouchableOpacity
        onPress={() => {
          onBgClick()
        }}
        style={styles.background}
      >
        <View style={styles.modalWrap} onStartShouldSetResponder={() => true}>
          <CheckboxItemsList
            onItemSelect={onItemSelect}
            data={data}
            style={{
              container: styles.list,
            }}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#00000020',
    top: 0,
  },
  modalWrap: {
    width: '75%',
    margin: '12.5%',
  },
  list: {
    width: '100%',
    minHeight: 400,
    backgroundColor: '#FFFFFF',
    height: 'auto',
    paddingVertical: 15,
    borderRadius: 10,
  },
})
