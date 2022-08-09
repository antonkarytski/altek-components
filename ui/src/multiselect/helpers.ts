import { ListItemProps, MultiSelectListProps } from './types'

type ListStyle = ListItemProps['style']
function composeListStyles(styles1: ListStyle, styles2: ListStyle): ListStyle {
  return {
    item: [styles1?.item, styles2?.item],
    selected: [styles1?.selected, styles2?.selected],
    textWrap: [styles1?.textWrap, styles2?.textWrap],
    textWrapSelected: [styles1?.textWrapSelected, styles2?.textWrapSelected],
    text: [styles1?.text, styles2?.text],
    textSelected: [styles1?.textSelected, styles2?.textSelected],
    checkbox: styles1?.checkbox,
  }
}

export function composeItemStylesWithListStyles(
  styles1: ListStyle,
  styles2: MultiSelectListProps<any, any>['style']
): ListStyle {
  return {
    item: [styles1?.item, styles2?.listItem],
    selected: [styles1?.selected, styles2?.selectedListItem],
    textWrap: [styles1?.textWrap, styles2?.listItemTextWrap],
    textWrapSelected: [
      styles1?.textWrapSelected,
      styles2?.selectedListItemTextWrap,
    ],
    text: [styles1?.text, styles2?.listItemText],
    textSelected: [styles1?.textSelected, styles2?.selectedListItemText],
    checkbox: styles1?.checkbox,
  }
}
