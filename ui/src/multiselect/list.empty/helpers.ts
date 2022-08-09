import { RowMultiSelectStyles } from '../mode.row/types'
import { emptyListItemStyles } from './styles'
import { EmptyItemsListStyles } from './types'

export function mergeRowMultiselectStyles(
  componentStyles: RowMultiSelectStyles
): EmptyItemsListStyles {
  return {
    container: componentStyles.container,
    item: [emptyListItemStyles.item, componentStyles.item],
    selected: [emptyListItemStyles.selected, componentStyles.selectedItem],
    text: [emptyListItemStyles.text, componentStyles.itemText],
    textSelected: [
      emptyListItemStyles.textSelected,
      componentStyles.selectedItemText,
    ],
    textWrap: emptyListItemStyles.textWrap,
  }
}
