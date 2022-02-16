import React, { useEffect } from 'react'
import MultiSelectItemsList from '../list/MultiSelectItemsList'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  BackHandler,
} from 'react-native'
import { MultiSelectListProps } from '../types'
import { screenWidth } from '../../../lib/helpers/screen'
import { Fn } from '../../../types'

type SelectListProps<V extends string, L extends string> = {
  itemType?: MultiSelectListProps<V, L>['type']
  onBgClick: Fn
  style?: MultiSelectListProps<V, L>['style'] & {
    selectListContainer?: StyleProp<ViewStyle>
  }
  onRequestClose?: Fn
} & Omit<MultiSelectListProps<V, L>, 'type' | 'style'>

export default function SelectList<V extends string, L extends string>({
  style,
  itemType,
  onItemSelect,
  data,
  onBgClick,
  onRequestClose,
}: SelectListProps<V, L>) {
  useEffect(() => {
    function backAction() {
      if (onRequestClose) onRequestClose()
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [onRequestClose])

  return (
    <>
      <TouchableOpacity style={styles.closeOverlay} onPress={onBgClick} />
      <View style={[styles.container, style?.selectListContainer]}>
        <MultiSelectItemsList
          type={itemType}
          onItemSelect={onItemSelect}
          data={data}
          style={{ container: styles.list }}
        />
      </View>
      <TouchableOpacity
        style={[styles.closeOverlay, styles.closeOverlayBottom]}
        onPress={onBgClick}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: 260,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 10,
    zIndex: 100,
    width: screenWidth - 32,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: 'visible',
  },
  list: {
    paddingTop: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  closeOverlay: {
    position: 'absolute',
    height: 1000,
    width: '100%',
    top: -1000,
    zIndex: 4,
  },
  closeOverlayBottom: {
    top: 0,
  },
})
