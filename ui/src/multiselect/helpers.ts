import { MultiSelectModes } from './types'

export type MultiSelectModesRouter = ReturnType<typeof routeMultiSelectMode>

export function routeMultiSelectMode({
  type,
  containType,
  topButtonBehavior,
}: Partial<Omit<MultiSelectModes, 'itemType' | 'selectedItemsType'>>) {
  return {
    modal: type === 'modal',
    select: type === 'select',
    row: type === 'row',
    containInside: containType === 'inside',
    containUnder: containType === 'under',
    topButtonNone: topButtonBehavior === 'none',
    topButtonAll: topButtonBehavior === 'all',
  }
}
