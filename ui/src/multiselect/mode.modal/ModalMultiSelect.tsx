import React from 'react'
import MultiSelectInput from '../input/MultiSelectInput'
import ModalList from './ModalList'
import SelectedItems from '../SelectedItems'
import { useMultiSelectModel } from '../hook.model'
import { useModal } from '../hook.modal'
import { MultiSelectProps } from '../types'

export default function ModalMultiSelect<V extends string, L extends string>({
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
  const { isVisible, hide, show } = useModal()
  const { items, onItemSelect } = useMultiSelectModel(
    {
      values,
      initialValue,
      containType,
      type: 'modal',
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
          showGeneralItem={showGeneralItem}
          type={selectedItemsType}
          topButtonBehavior={topButtonBehavior}
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
          itemType={itemType}
        />
      ) : null}
    </>
  )
}
