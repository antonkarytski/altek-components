import React, { MutableRefObject, useEffect, useState } from 'react'
import MultiSelectItemsList from '../list/MultiSelectItemsList'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  BackHandler,
  Dimensions,
} from 'react-native'
import { MultiSelectListProps } from '../types'
import { Fn, useFnRef } from 'altek-toolkit'

export type SelectListController = {
  show: Fn
  hide: Fn
  toggle: Fn
}

type SelectListProps<V extends string, L extends string> = {
  itemType?: MultiSelectListProps<V, L>['type']
  style?: MultiSelectListProps<V, L>['style'] & {
    selectListContainer?: StyleProp<ViewStyle>
  }
  controller: MutableRefObject<SelectListController | null>
  onVisibleChange?: (state: boolean) => void
} & Omit<MultiSelectListProps<V, L>, 'type' | 'style'>

const noop = () => {}

export default function SelectList<V extends string, L extends string>({
  style,
  itemType,
  onItemSelect,
  data,
  controller,
  onVisibleChange = noop,
}: SelectListProps<V, L>) {
  const [isVisible, setVisible] = useState(false)
  const onVisibleChangeRef = useFnRef(onVisibleChange)

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setVisible(false)
        return true
      }
    )

    return () => backHandler.remove()
  }, [])

  useEffect(() => {
    onVisibleChangeRef.current(isVisible)
  }, [isVisible, onVisibleChangeRef])

  controller.current = {
    hide: () => setVisible(false),
    show: () => setVisible(true),
    toggle: () => setVisible((current) => !current),
  }

  if (!isVisible) return null

  return (
    <>
      <TouchableOpacity
        style={styles.closeOverlay}
        onPress={() => setVisible(false)}
      />
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
        onPress={() => setVisible(false)}
      />
    </>
  )
}

const screenWidth = Dimensions.get('window').width
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
