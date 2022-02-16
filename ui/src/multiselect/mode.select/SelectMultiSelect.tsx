import React from 'react'
import { StyleSheet } from 'react-native'
import MultiSelectInput from '../input/MultiSelectInput'
import SelectedItems from '../SelectedItems'
import SelectList from './SelectList'
import { useMultiSelectModel } from '../hook.model'
import { useModal } from '../hook.modal'
import { MultiSelectProps } from '../types'

export default function SelectMultiSelect<V extends string, L extends string>({
  containType,
  itemType,
  selectedItemsType,
  showGeneralItem,
  values,
  topButtonBehavior = 'all',
  placeholder,
  initialValue,
  onChange,
  style,
}: Omit<MultiSelectProps<V, L>, 'type'>) {
  const { isVisible, hide, show, toggle } = useModal()
  const { items, onItemSelect, mode } = useMultiSelectModel(
    {
      type: 'select',
      values,
      initialValue,
      containType,
      topButtonBehavior,
    },
    {
      onChange,
      onSelect: hide,
    }
  )

  const listStyle = {
    selectListContainer: mode.containUnder ? styles.containUnder : null,
  }

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
          topButtonBehavior={topButtonBehavior}
          values={items}
          onPressItem={onItemSelect}
          onPressGeneralItem={show}
        />
      </MultiSelectInput>
      {isVisible ? (
        <SelectList
          onBgClick={hide}
          style={listStyle}
          data={items}
          onItemSelect={onItemSelect}
          itemType={itemType}
          onRequestClose={hide}
        />
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  visibleModalInput: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  containUnder: {
    top: 34,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
})
