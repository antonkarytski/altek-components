import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'
import MultiSelectInput from '../input/MultiSelectInput'
import SelectedItems from '../SelectedItems'
import SelectList, { SelectListController } from './SelectList'
import { useMultiSelectModel } from '../hook.model'
import { MultiSelectProps } from '../types'
import { useModal } from '../hook.modal'

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
  const { isVisible, setVisible } = useModal()
  const listController = useRef<SelectListController | null>(null)
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
      onSelect: () => listController.current?.hide(),
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
        onPress={() => listController.current?.toggle()}
        placeholder={placeholder}
      >
        <SelectedItems
          showGeneralItem={showGeneralItem}
          type={selectedItemsType}
          topButtonBehavior={topButtonBehavior}
          values={items}
          onPressItem={onItemSelect}
          onPressGeneralItem={() => listController.current?.show()}
        />
      </MultiSelectInput>
      <SelectList
        style={listStyle}
        data={items}
        onItemSelect={onItemSelect}
        itemType={itemType}
        onVisibleChange={setVisible}
        controller={listController}
      />
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
