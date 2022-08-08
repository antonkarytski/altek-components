import React from 'react'
import RowMultiSelect from './mode.row/RowMultiSelect'
import ModalMultiSelect from './mode.modal/ModalMultiSelect'
import SelectMultiSelect from './mode.select/SelectMultiSelect'
import RowListItem from './list.row/RowListItem'
import EmptyListItem from './list.empty/EmptyListItem'
import CheckboxListItem from './list.checkbox/CheckboxListItem'

const MultiSelect = {
  Select: SelectMultiSelect,
  Modal: ModalMultiSelect,
  Row: RowMultiSelect,
}

const MultiSelectItem = {
  Row: RowListItem,
  Empty: EmptyListItem,
  Checkbox: CheckboxListItem,
}

export default MultiSelect
