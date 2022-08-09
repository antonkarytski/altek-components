import React, { useCallback, useRef } from 'react'
import { StyleSheet } from 'react-native'
import MultiSelectInput from '../input/MultiSelectInput'
import SelectedItems from '../SelectedItems'
import SelectList, { SelectListController } from './SelectList'
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
  const listController = useRef<SelectListController | null>(null)
  const { isVisible, setVisible } = useModal()
  const { items, onItemSelect } = useMultiSelectModel(
    {
      values,
      initialValue,
      topButtonBehavior,
    },
    {
      onChange,
      onSelect: () => listController.current?.hide(),
    }
  )

  const showList = useCallback(() => {
    listController.current?.show()
  }, [])

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
          onPressGeneralItem={showList}
        />
      </MultiSelectInput>
      <SelectList
        style={containType === 'under' ? containUnderListStyles : null}
        data={items}
        onItemSelect={onItemSelect}
        onVisibleChange={setVisible}
        controller={listController}
      >
        {children}
      </SelectList>
    </>
  )
}

const containUnderListStyles = StyleSheet.create({
  selectListContainer: {
    top: 34,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
})

const styles = StyleSheet.create({
  visibleModalInput: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
})
