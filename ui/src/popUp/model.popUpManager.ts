import {
  AdditionalPropsStructure,
  PopUpModel,
  PopUpOptions,
  PopUpShowOptions,
  PopUpsSet,
  PopUpSubmitOptions,
  SetOptionsProps,
  StartAnimationEffectProps,
  StartAnimationProps,
} from './types.model'
import {
  attach,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector'
import { Animated } from 'react-native'
import { noop } from './helpers'

export const initialOptions: PopUpOptions & PopUpSubmitOptions = {
  isClosable: true,
  autoCloseTime: -1,
  onSubmit: noop,
  onReject: noop,
  onUnmount: noop,
}

export const initialState: PopUpModel = {
  isMounted: false,
  animatedValue: new Animated.Value(0),
  ...initialOptions,
}

export class PopUpManager<
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
> {
  private readonly updateState = createEvent<SetOptionsProps<Names>>()

  private readonly _show = createEvent<PopUpShowOptions<Names>>()
  public readonly show = <N extends Names, A extends S[N]>(
    props: PopUpShowOptions<N, A>
  ) => this._show(props)
  public readonly hide = createEvent<Names>()
  public readonly register = createEvent<Names>()
  public readonly unregister = createEvent<Names>()
  public readonly $store = createStore<PopUpsSet>({})
    .on(this.register, (state, popUp) => {
      return {
        ...state,
        [popUp]: {
          ...initialState,
          animatedValue: new Animated.Value(0),
        },
      }
    })
    .on(this.unregister, (state, popUp) => {
      if (!(popUp in state)) return state
      const stateWithoutPopUp = { ...state }
      delete stateWithoutPopUp[popUp]
      return stateWithoutPopUp
    })
    .on(this.updateState, (state, { popUp, isMounted, ...options }) => ({
      ...state,
      [popUp]: { ...state[popUp], ...options, isMounted },
    }))

  private startAnimation = attach({
    source: this.$store,
    mapParams: (
      { to, popUp }: StartAnimationProps<Names>,
      state: PopUpsSet
    ) => ({ to, state: state[popUp].animatedValue }),
    effect: createEffect(async ({ state, to }: StartAnimationEffectProps) => {
      return new Promise((resolve) => {
        Animated.spring(state, {
          toValue: to,
          tension: 10,
          friction: 5,
          useNativeDriver: true,
        }).start(resolve)
      })
    }),
  })

  public constructor() {
    this._show.watch(({ popUp, autoCloseTime, ...options }) => {
      const props: SetOptionsProps<Names> = {
        ...options,
        popUp,
        isMounted: true,
      }
      if (autoCloseTime && autoCloseTime > 0)
        props.autoCloseTime = autoCloseTime
      this.updateState(props)
      this.startAnimation({ to: 1, popUp }).catch(noop)
    })

    sample({
      source: this.$store,
      clock: this.hide,
      fn: (popUpsSet, popUp) => ({ popUp, popUpsSet }),
    }).watch(async ({ popUp, popUpsSet }) => {
      if (!(popUp in popUpsSet)) return
      popUpsSet[popUp].onUnmount?.()
      await this.startAnimation({ to: 0, popUp })
      this.updateState({ popUp, isMounted: false, ...initialOptions })
    })
  }
}

export const createPopUpManager = <
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
>() => new PopUpManager<Names, S>()
