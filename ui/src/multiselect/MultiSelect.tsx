import React from 'react'
import RowMultiSelect from './mode.row/RowMultiSelect'
import ModalMultiSelect from './mode.modal/ModalMultiSelect'
import SelectMultiSelect from './mode.select/SelectMultiSelect'

const MultiSelect = {
  Select: SelectMultiSelect,
  Modal: ModalMultiSelect,
  Row: RowMultiSelect,
}

export default MultiSelect
