import React from 'react'
import RowMultiSelect from './mode.row/RowMultiSelect'
import ModalMultiSelect from './mode.modal/ModalMultiSelect'
import SelectMultiSelect from './mode.select/SelectMultiSelect'
import EmptyItemsList from "./list.empty/EmptyItemsList";
import CheckboxItemsList from "./list.checkbox/CheckboxItemsList";
import RowItemsList from "./list.row/RowItemsList";

const MultiSelect = {
  Select: SelectMultiSelect,
  Modal: ModalMultiSelect,
  Row: RowMultiSelect,
}

export const MultiSelectItemsList = {
  Row: RowItemsList,
  Empty: EmptyItemsList,
  Checkbox: CheckboxItemsList,
}

export default MultiSelect
