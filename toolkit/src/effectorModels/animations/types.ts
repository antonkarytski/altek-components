import { Effect } from 'effector'
import { Animated } from 'react-native'
import { Fn } from '../../types'

export type AnimationEffectHandler = (
  value: Animated.Value,
  to: number
) => Animated.CompositeAnimation

export type AnimationObjectInitialProps<R extends Record<string, number>> = {
  startValue?: number
  beforeHide?: Fn
  beforeShow?: Fn
  onAnimation?: (to: number) => void

  showAnimation?: AnimationEffectHandler
  hideAnimation?: AnimationEffectHandler
  goToAnimation?: AnimationEffectHandler

  registeredStates?: R
  animation?: AnimationEffectHandler
  showValue?: number
  hideValue?: number
}

export type AnimationEffectController = {
  current: {
    stop: Fn
  }
}

export type AnimationEffect<P = number> = Effect<P, boolean> & {
  controller?: AnimationEffectController
}
