import { SelectedValueProps, SelectValue } from '../types'
import { useMemo, useRef, useState } from 'react'
import { useConst } from 'altek-toolkit'

export function useNormalisedMultiSelectValues<
  V extends string,
  L extends string
>(values: SelectValue<V, L>[]) {
  return useConst(() => {
    return values.map((value) => ({
      ...value,
      selected: false,
      disabled: false,
    }))
  }) as SelectedValueProps<V, L>[]
}
