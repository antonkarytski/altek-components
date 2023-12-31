import React from 'react'
import MultiSelectInput from '../input/MultiSelectInput'
import ModalList from './ModalList'
import SelectedItems from '../SelectedItems'
import { useMultiSelectModel } from '../hook.model'
import { useModal } from '../hook.modal'
import { MultiSelectProps } from '../types'

export default function ModalMultiSelect<V extends string, L extends string>({
  containType = 'inside',
  selectedItemsType,
  showGeneralItem,
  values,
  topButtonBehavior = 'all',
  placeholder,
  initialValue,
  onChange,
  style,
}: MultiSelectProps<V, L>) {
  const { isVisible, hide, show } = useModal()
  const { items, onItemSelect, states } = useMultiSelectModel(
    {
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

  return (
    <>
      <MultiSelectInput
        withShadow
        type={containType}
        onPress={show}
        placeholder={placeholder}
        style={style?.input}
      >
        <SelectedItems
          states={states}
          showGeneralItem={showGeneralItem}
          type={selectedItemsType}
          values={items}
          onPressItem={onItemSelect}
          onPressGeneralItem={show}
        />
      </MultiSelectInput>
      {isVisible ? (
        <ModalList
          data={items}
          onItemSelect={onItemSelect}
          onBgClick={hide}
          onRequestClose={hide}
        />
      ) : null}
    </>
  )
}
