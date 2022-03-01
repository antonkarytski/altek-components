import { useEffect, useRef } from 'react'
import { useStoreMap } from 'effector-react'
import { initialState, PopUpManager } from './model.popUpManager'
import { AdditionalPropsStructure, PopUpModel, PopUpsSet } from './types.model'
import { createPopUpSubmitComponent } from './submit/PopUpSubmit'
import { createPopUpNotificationComponent } from './notification/PopUpNotification'

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

export enum PopUp {
  BID_PLACED = 'bidPlaced',
}

export type PopUpProps = {
  [PopUp.BID_PLACED]:
    | {
        mode: 'withCredits'
        props: {
          go: 2
        }
      }
    | {
        mode: 'failed'
        props?: never
      }
}

export const popUps = new PopUpManager<PopUp, PopUpProps>()
export const usePopUp = createPopUpHook(popUps)
export const PopUpSubmit = createPopUpSubmitComponent(popUps)
export const PopUpNotification = createPopUpNotificationComponent(popUps)
