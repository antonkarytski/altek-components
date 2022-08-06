import { useStore } from 'effector-react'
import { useCallback } from 'react'
import { AnimatedRawModel } from './model'
import { noop } from '../../helpers'

export function useAnimatedModel({
  $isMounted,
  $animatedValue,
  $isInCustomState,
  showValue,
  hideValue,
  hide: asyncHide,
  $currentStateValue,
}: AnimatedRawModel) {
  const isMounted = useStore($isMounted)
  const animatedValue = useStore($animatedValue)
  const isInCustomState = useStore($isInCustomState)
  const currentStateValue = useStore($currentStateValue)
  const hide = useCallback(() => {
    return asyncHide().catch(noop)
  }, [asyncHide])
  return {
    isMounted,
    animatedValue,
    isInCustomState,
    currentStateValue,
    showValue,
    hideValue,
    asyncHide,
    hide,
  }
}

export type AnimatedModel = ReturnType<typeof useAnimatedModel>
