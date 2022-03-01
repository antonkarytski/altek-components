import { useEffect, useRef } from 'react'
import { useStoreMap } from 'effector-react'
import { PopUpManager } from './model.popUpManager'
import { AdditionalPropsStructure, PopUpModel, PopUpsSet } from './types.model'

export function usePopUpRegistration<Name extends string>(
  popUpName: Name,
  popUpManager: PopUpManager<Name>
) {
  const name = useRef(popUpName).current
  const manager = useRef(popUpManager).current

  useEffect(() => {
    manager.register(name)
    return () => {
      manager.unregister(name)
    }
  }, [name, manager])
}

export function useCommonPopUp<
  Name extends string,
  S extends AdditionalPropsStructure<Name>,
  Props extends S[Name]
>(popUpName: Name, popUpManager: PopUpManager<Name, S>) {
  const name = useRef<Name>(popUpName).current
  return useStoreMap<PopUpsSet<Name, S>, PopUpModel<Props>, [Name]>({
    store: popUpManager.$store,
    keys: [name],
    fn: (state) => state[name] as PopUpModel<Props>,
    updateFilter: (prev, next) => prev !== next,
  })
}

export function createPopUpHook<Names extends string>(
  manager: PopUpManager<Names>
) {
  return <N extends Names>(name: N) => {
    return useCommonPopUp(name, manager)
  }
}
