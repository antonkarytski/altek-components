import { useCallback, useEffect, useState } from 'react'
import { useCommonPopUp } from './hook'
import { PopUpManager } from './model.popUpManager'
import { AdditionalPropsStructure } from './types.model'

type UsePopUpAutoMountProps = {
  autoMount?: boolean
  preventAutoUnmount?: boolean
}

export function usePopUpAutoMount<
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
>(
  popUpName: Names,
  manager: PopUpManager<Names, S>,
  { autoMount, preventAutoUnmount }: UsePopUpAutoMountProps
) {
  const [forceUnmounted, setIsForceUnmounted] = useState(false)
  const { isMounted } = useCommonPopUp(popUpName, manager)

  useEffect(() => {
    if (!autoMount && forceUnmounted) setIsForceUnmounted(false)
  }, [autoMount, forceUnmounted])

  useEffect(() => {
    if (autoMount === undefined) return
    if (autoMount && !isMounted && !forceUnmounted) {
      manager.show({ popUp: popUpName })
      return
    }
    if (preventAutoUnmount) return
    if (!autoMount && isMounted) {
      manager.hide(popUpName)
      return
    }
  }, [isMounted, autoMount, preventAutoUnmount, forceUnmounted, manager])

  const forceUnmount = useCallback(() => {
    manager.hide(popUpName)
    setIsForceUnmounted(true)
  }, [manager])

  return { forceUnmount }
}
