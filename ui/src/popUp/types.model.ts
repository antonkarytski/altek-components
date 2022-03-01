import { Fn } from 'altek-toolkit'
import { Animated } from 'react-native'

export type PopUpNameProp<N extends string> = {
  popUp: N
}

export type AdditionalProps = {
  mode?: string
  props?: object
}

export type PopUpSubmitOptions = {
  onReject?: Fn
  onSubmit?: Fn
}

export type PopUpOptions = {
  isClosable: boolean
  autoCloseTime: number
  onUnmount: Fn
}

export type PopUpShowOptions<
  Names extends string,
  A extends AdditionalProps | undefined = AdditionalProps
> = PopUpNameProp<Names> &
  Partial<PopUpOptions> &
  Partial<PopUpSubmitOptions> &
  A

export type SetOptionsProps<Names extends string> = PopUpShowOptions<Names> & {
  isMounted: boolean
}

export type AdditionalPropsStructure<Names extends string> = Partial<
  Record<Names, AdditionalProps>
>

export type PopUpModel<A extends AdditionalProps | undefined = undefined> = {
  isMounted: boolean
  animatedValue: Animated.Value
} & PopUpOptions &
  PopUpSubmitOptions &
  (A extends undefined ? AdditionalProps : A)

export type PopUpsSet<
  N extends string,
  P extends AdditionalPropsStructure<N>
> = { [key in N]: PopUpModel<P[key]> }

export type StartAnimationEffectProps = { state: Animated.Value; to: number }
export type StartAnimationProps<Names extends string> = {
  to: number
} & PopUpNameProp<Names>
