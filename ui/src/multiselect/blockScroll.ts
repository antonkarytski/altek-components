import { createObservable, useObservable } from 'altek-toolkit'

export const $blockScroll = createObservable(false)

export function useMultiSelectScrollBlock() {
  return useObservable($blockScroll)
}
