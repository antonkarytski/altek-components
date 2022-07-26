import { useCallback, useEffect, useState } from 'react'
import { useCommonPopUp } from './hook'
import { PopUpManager } from './model.popUpManager'
import {
  AdditionalProps,
  AdditionalPropsStructure,
  PopUpShowOptions,
} from './types.model'

type UsePopUpAutoMountProps<
  D extends AdditionalProps | undefined = AdditionalProps
> = {
  autoMount?: boolean
  preventAutoUnmount?: boolean
  defaultAdditionalProps?: D
}

export function usePopUpAutoMount<
  Names extends string,
  Name extends Names,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
>(
  popUpName: Name,
  manager: PopUpManager<Names, S>,
  {
    autoMount,
    preventAutoUnmount,
  }: UsePopUpAutoMountProps<S[Name]>
) {
  const [forceUnmounted, setIsForceUnmounted] = useState(false)
  const { isMounted } = useCommonPopUp(popUpName, manager)

  useEffect(() => {
    if (!autoMount && forceUnmounted) setIsForceUnmounted(false)
  }, [autoMount, forceUnmounted])

  useEffect(() => {
    if (autoMount === undefined) return
    if (autoMount && !isMounted && !forceUnmounted) {
      manager.show({popUp: popUpName,} as PopUpShowOptions<Name, S[Name]>)
      return
    }
    if (preventAutoUnmount) return
    if (!autoMount && isMounted) {
      manager.hide(popUpName)
      return
    }
  }, [
    isMounted,
    autoMount,
    preventAutoUnmount,
    forceUnmounted,
    manager,
    popUpName,
  ])

  const forceUnmount = useCallback(() => {
    manager.hide(popUpName)
    setIsForceUnmounted(true)
  }, [manager, popUpName])

  return { forceUnmount }
}
