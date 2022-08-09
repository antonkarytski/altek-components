import React, { useMemo } from 'react'
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  Dimensions,
} from 'react-native'
import { MultiSelectListProps } from '../types'
import { Fn } from 'altek-toolkit'
import CheckboxItemsList from '../list.checkbox/CheckboxItemsList'


type SelectListProps<V extends string, L extends string> = {
  style?:
    | (MultiSelectListProps<V, L>['style'] & {
        selectListContainer?: StyleProp<ViewStyle>
      })
    | null
  isVisible?: boolean
  onOverlayPress?: Fn
} & Omit<MultiSelectListProps<V, L>, 'style'>


const SelectList = React.memo(
  <V extends string, L extends string>({
    style,
    onItemSelect,
    data,
    onOverlayPress,
    children,
    isVisible,
  }: SelectListProps<V, L>) => {
    const listWithProps = useMemo(() => {
      if (children) {
        return React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            ...child.props,
            onItemSelect,
            data,
            containerStyle: styles.list,
          })
        })
      }

      return (
        <CheckboxItemsList
          onItemSelect={onItemSelect}
          data={data}
          style={{ container: styles.list }}
        />
      )
    }, [onItemSelect, data, children])

    return (
      <>
        <TouchableOpacity
          style={[styles.closeOverlay, !isVisible ? styles.hidden : null]}
          onPress={onOverlayPress}
        />
        <View
          style={[
            styles.container,
            style?.selectListContainer,
            !isVisible ? styles.hidden : null,
          ]}
        >
          {listWithProps}
        </View>
        <TouchableOpacity
          style={[
            styles.closeOverlay,
            styles.closeOverlayBottom,
            !isVisible ? styles.hidden : null,
          ]}
          onPress={onOverlayPress}
        />
      </>
    )
  }
)

export default SelectList

const screenWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
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
