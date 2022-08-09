import React, { useEffect } from 'react'
import { BackHandler, StyleSheet } from 'react-native'
import MultiSelectInput from '../input/MultiSelectInput'
import SelectedItems from '../SelectedItems'
import SelectList from './SelectList'
import { useMultiSelectModel } from '../hook.model'
import { MultiSelectProps } from '../types'
import { useModal } from '../hook.modal'

export default function SelectMultiSelect<V extends string, L extends string>({
  containType = 'inside',
  selectedItemsType,
  showGeneralItem,
  values,
  topButtonBehavior = 'all',
  placeholder,
  initialValue,
  onChange,
  style,
  children,
}: MultiSelectProps<V, L>) {
  const { isVisible, setVisible, hide, toggle, show } = useModal()
  const { items, onItemSelect, states } = useMultiSelectModel(
    {
      values,
      initialValue,
      topButtonBehavior,
    },
    {
      onChange,
      onSelect: hide,
    }
  )

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        setVisible(false)
        return true
      }
    )

    return backHandler.remove
  }, [])

  return (
    <>
      <MultiSelectInput
        withShadow
        style={[isVisible ? styles.visibleModalInput : null, style?.input]}
        type={containType}
        onPress={toggle}
        placeholder={placeholder}
      >
        <SelectedItems
          showGeneralItem={showGeneralItem}
          type={selectedItemsType}
          values={items}
          onPressItem={onItemSelect}
          onPressGeneralItem={show}
          states={states}
        />
      </MultiSelectInput>
      <SelectList
        style={containType === 'under' ? styles.selectListUnderStyle : null}
        data={items}
        onItemSelect={onItemSelect}
        onOverlayPress={hide}
        isVisible={isVisible}
      >
        {children}
      </SelectList>
    </>
  )
}

const styles = StyleSheet.create({
  visibleModalInput: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  selectListUnderStyle: {
    top: 34,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
})
