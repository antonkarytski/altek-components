import React, { useMemo } from 'react'
import ItemsList from '../list/ItemsList'
import RowListItem, { rowListItemStyles } from './RowListItem'
import { MultiSelectListProps } from '../types'
import { composeItemStylesWithListStyles } from '../helpers'

const RowItemsList = React.memo(
  <V extends string, L extends string>({
    data = [],
    onItemSelect = () => {},
    inRow,
    style,
    containerStyle,
  }: MultiSelectListProps<V, L>) => {
    const itemStyles = useMemo(
      () => composeItemStylesWithListStyles(rowListItemStyles, style),
      [style]
    )

    return (
      <ItemsList
        preventScroll={inRow}
        data={data}
        style={[style?.container, containerStyle]}
      >
        {({ label, value, selected }, index) => {
          return (
            <RowListItem
              index={index}
              key={`${label}${value}${index}`}
              onPress={onItemSelect}
              label={label}
              selected={selected}
              style={itemStyles}
            />
          )
        }}
      </ItemsList>
    )
  }
)

export default RowItemsList
