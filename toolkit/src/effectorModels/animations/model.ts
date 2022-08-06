import {
  attach,
  createEffect,
  createEvent,
  createStore,
  restore,
  Store,
} from 'effector'
import { Animated } from 'react-native'
import {
  AnimationEffect,
  AnimationEffectController,
  AnimationEffectHandler,
  AnimationObjectInitialProps,
} from './types'
import { fastSpringAnimation } from './animations'
import { createMountedModel } from '../model.mount'
import { noop } from '../../helpers'

type HideControlProps = {
  onHideProcess: boolean
  isMounted: boolean
}

type ShowControlProps = {
  onShowProcess: boolean
}

const defaultAnimation: AnimationEffectHandler = (value, to) =>
  fastSpringAnimation(value, to)

function createAnimationEffect(
  animation: AnimationEffectHandler,
  animatedStore: Store<Animated.Value>
): AnimationEffect {
  const controller: AnimationEffectController = {
    current: {
      stop() {},
    },
  }
  const animationEffect: AnimationEffect = attach({
    source: animatedStore,
    effect: createEffect<{ state: Animated.Value; to: number }, boolean>(
      async ({ state, to }) => {
        return new Promise<boolean>((resolve, reject) => {
          const effect = animation(state, to)
          effect.start(() => resolve(true))
          controller.current.stop = () => {
            reject()
            effect.stop()
            controller.current.stop = () => {}
          }
        })
      }
    ),
    mapParams: (to: number, state) => ({ state, to }),
  })
  animationEffect.controller = controller
  return animationEffect
}

export function createAnimatedModel<R extends Record<string, number>>({
  startValue: userStartValue,
  beforeHide,
  beforeShow,
  animation,
  showAnimation: showAnimationHandler,
  hideAnimation: hideAnimationHandler,
  goToAnimation: goToAnimationHandler,
  showValue = 1,
  hideValue = 0,
  registeredStates = {} as R,
  onAnimation,
}: AnimationObjectInitialProps<R> = {}) {
  const startValue = userStartValue ?? hideValue

  const resetAnimatedValue = createEvent()
  const $animatedValue = createStore(new Animated.Value(startValue)).reset(
    resetAnimatedValue
  )
  const setCurrentStateValue = createEvent<number>()
  const $currentStateValue = restore(setCurrentStateValue, startValue).reset(
    resetAnimatedValue
  )

  const $isInCustomState = $currentStateValue.map((value) => {
    return value !== showValue && value !== hideValue
  })

  const { $isMounted, setIsMounted } = createMountedModel(
    startValue === showValue
  )

  const setOnHideProcess = createEvent<boolean>()
  const $onHideProcess = restore(setOnHideProcess, false)

  const setOnShowProcess = createEvent<boolean>()
  const $onShowProcess = restore(setOnShowProcess, false)

  const showAnimation = createAnimationEffect(
    showAnimationHandler || animation || defaultAnimation,
    $animatedValue
  )

  const hideAnimation = createAnimationEffect(
    hideAnimationHandler || animation || defaultAnimation,
    $animatedValue
  )

  const goToCustomState = createAnimationEffect(
    goToAnimationHandler || animation || defaultAnimation,
    $animatedValue
  )

  const show = attach({
    source: { onShowProcess: $onShowProcess },
    mapParams: (_: void, source) => ({ ...source }),
    effect: createEffect(({ onShowProcess }: ShowControlProps) => {
      if (onShowProcess) return
      setOnShowProcess(true)
      if (beforeShow) beforeShow()
      if (onAnimation) onAnimation(showValue)
      if (hideAnimation.controller) hideAnimation.controller.current.stop()
      setIsMounted(true)
      return showAnimation(showValue)
        .then(() => {
          setCurrentStateValue(showValue)
        })
        .finally(() => {
          setOnShowProcess(false)
        })
    }),
  })

  const hide = attach({
    source: { onHideProcess: $onHideProcess, isMounted: $isMounted },
    mapParams: (_: void, source) => ({ ...source }),
    effect: createEffect(({ onHideProcess, isMounted }: HideControlProps) => {
      if (onHideProcess || !isMounted) return
      setOnHideProcess(true)
      if (beforeHide) beforeHide()
      if (onAnimation) onAnimation(hideValue)
      if (showAnimation.controller) {
        showAnimation.controller.current.stop()
      }
      return hideAnimation(hideValue)
        .then(() => {
          setIsMounted(false)
          setCurrentStateValue(hideValue)
        })
        .finally(() => {
          setOnHideProcess(false)
        })
    }),
  })

  goToCustomState.watch((to) => {
    if (onAnimation) onAnimation(to)
  })

  goToCustomState.done.watch(({ params }) => {
    setCurrentStateValue(params)
  })

  const reset = createEvent()
  reset.watch(async () => {
    await hide()
    resetAnimatedValue()
  })

  return {
    $animatedValue,
    $isMounted,
    $isInCustomState,
    $currentStateValue,
    hide,
    hideSync() {
      hide().catch(noop)
    },
    show,
    showSync() {
      show().catch(noop)
    },
    reset,
    resetAnimatedValue,
    setIsMounted,
    goToCustomState,
    showValue,
    hideValue,
    states: registeredStates as R,
  }
}

export type AnimatedRawModel = ReturnType<typeof createAnimatedModel>
