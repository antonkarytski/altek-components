import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import MultiSelectInput from '../input/MultiSelectInput'
import { useMultiSelectModel } from '../hook.model'
import { MultiSelectProps, SelectValue } from '../types'
import EmptyItemsList from '../list.empty/EmptyItemsList'
import { RowMultiSelectStyles } from './types'
import { mergeRowMultiselectStyles } from '../list.empty/helpers'

export type RowMultiSelectProps<V extends string, L extends string> = {
  values: SelectValue<V, L>[]
  initialValue?: V[]
  topButtonBehavior?: MultiSelectProps<V, L>['topButtonBehavior']
  onChange: (values: V[]) => void
  style?: RowMultiSelectStyles
}

export default function RowMultiSelect<V extends string, L extends string>({
  values,
  topButtonBehavior = 'all',
  initialValue,
  onChange,
  style,
}: RowMultiSelectProps<V, L>) {
  const { items, onItemSelect } = useMultiSelectModel(
    {
      values,
      initialValue,
      topButtonBehavior,
    },
    { onChange }
  )

  const mergedStyles = useMemo(() => {
    return mergeRowMultiselectStyles({
      ...style,
      container: [styles.list, style?.container],
    })
  }, [style])

  return (
    <MultiSelectInput style={[styles.input, style?.container]}>
      <View>
        <EmptyItemsList
          inRow
          onItemSelect={onItemSelect}
          data={items}
          style={mergedStyles}
        />
      </View>
    </MultiSelectInput>
  )
}

const styles = StyleSheet.create({
  input: {
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
