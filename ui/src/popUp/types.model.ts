import { Fn } from 'altek-toolkit'
import { Animated } from 'react-native'

export type PopUpNameProp<Names extends string> = {
  popUp: Names
}

export type AdditionalProps<
  M extends string | undefined = undefined,
  P extends object | undefined = undefined
> = {
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

export type PopUpOptionsExt<
  A extends AdditionalProps = AdditionalProps
> = Partial<PopUpOptions> & AdditionalProps<A['mode'], A['props']>

export type PopUpShowOptions<
  Names extends string,
  A = AdditionalProps
> = PopUpNameProp<Names> & PopUpOptionsExt<A> & Partial<PopUpSubmitOptions>

export type SetOptionsProps<Names extends string> = PopUpShowOptions<Names> & {
  isMounted: boolean
}

export type AdditionalPropsStructure<Names extends string> = Partial<
  Record<Names, AdditionalProps>
>

export type PopUpModel<
  A extends AdditionalProps | undefined = AdditionalProps
> = {
  isMounted: boolean
  animatedValue: Animated.Value
} & PopUpOptions &
  PopUpSubmitOptions &
  (A extends undefined ? AdditionalProps : A)

export type PopUpsSet<
  Names extends string,
  Props extends AdditionalPropsStructure<Names>
> = { [key in Names]: PopUpModel<Props[key]> }

export type StartAnimationEffectProps = { state: Animated.Value; to: number }
export type StartAnimationProps<Names extends string> = {
  to: number
} & PopUpNameProp<Names>
