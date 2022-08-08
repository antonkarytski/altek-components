import { MultiSelectModes } from './types'

export type MultiSelectModesRouter = ReturnType<typeof routeMultiSelectMode>

export function routeMultiSelectMode({
  containType,
  topButtonBehavior,
}: Partial<Omit<MultiSelectModes, 'itemType' | 'selectedItemsType'>> = {}) {
  return {
    containInside: containType === 'inside',
    containUnder: containType === 'under',
    topButtonNone: topButtonBehavior === 'none',
    topButtonAll: topButtonBehavior === 'all',
  }
}
