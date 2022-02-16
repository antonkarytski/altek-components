import React, { useEffect } from 'react'
import RowMultiSelect from './mode.row/RowMultiSelect'
import ModalMultiSelect from './mode.modal/ModalMultiSelect'
import SelectMultiSelect from './mode.select/SelectMultiSelect'
import { useMultiSelectMode } from './hook'
import { MultiSelectProps } from './types'

const noop = () => {}

export default function MultiSelect<V extends string, L extends string>({
  deleteAction,
  containType = 'inside',
  type = 'modal',
  topButtonBehavior = 'all',
  ...props
}: MultiSelectProps<V, L>) {
  const mode = useMultiSelectMode({ type })

  useEffect(() => {
    if (!deleteAction) return
    deleteAction.current = noop
  }, [deleteAction])

  if (mode.row) {
    return (
      <RowMultiSelect
        containType={containType}
        topButtonBehavior={topButtonBehavior}
        {...props}
      />
    )
  }

  if (mode.select) {
    return (
      <SelectMultiSelect
        containType={containType}
        topButtonBehavior={topButtonBehavior}
        {...props}
      />
    )
  }

  return (
    <ModalMultiSelect
      containType={containType}
      topButtonBehavior={topButtonBehavior}
      {...props}
    />
  )
}
