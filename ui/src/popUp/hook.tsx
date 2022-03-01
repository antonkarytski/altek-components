import { useEffect, useRef } from 'react'
import { useStoreMap } from 'effector-react'
import { initialState, PopUpManager } from './model.popUpManager'
import { AdditionalPropsStructure, PopUpModel, PopUpsSet } from './types.model'

export function usePopUpRegistration<
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
>(popUpName: Names, popUpManager: PopUpManager<Names, S>) {
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
  Names extends string,
  N extends Names,
  S extends AdditionalPropsStructure<Names>,
  Props extends S[N]
>(popUpName: N, popUpManager: PopUpManager<Names, S>) {
  const name = useRef<N>(popUpName).current
  return useStoreMap<PopUpsSet<Names, S>, PopUpModel<Props>, [Names]>({
    store: popUpManager.$store,
    keys: [name],
    fn: (state) => (state[name] || initialState) as PopUpModel<Props>,
    updateFilter: (prev, next) => prev !== next,
  })
}

export function createPopUpHook<
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
>(manager: PopUpManager<Names, S>) {
  return <N extends Names>(name: N) => {
    return useCommonPopUp(name, manager)
  }
}
