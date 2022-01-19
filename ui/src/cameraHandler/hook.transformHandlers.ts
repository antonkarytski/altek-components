import {
  SharedValue,
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated'
import { PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler'

type ScaleContext = {
  prevScale: number
}

type UseScaleGestureHandlerProps = {
  scale: SharedValue<number>
  minScale: SharedValue<number>
  maxScaleStep: number
}

export function useScaleGestureHandler({
  scale,
  minScale,
  maxScaleStep,
}: UseScaleGestureHandlerProps) {
  return useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    ScaleContext
  >({
    onStart(event, ctx) {
      ctx.prevScale = 1
    },
    onActive(event, ctx) {
      const k = scale.value > 1 && event.scale < ctx.prevScale ? 2 : 1
      scale.value += (event.scale - ctx.prevScale) * k
      ctx.prevScale = event.scale
    },
    onFinish() {
      const maxScale = minScale.value + maxScaleStep
      if (scale.value < minScale.value) {
        return (scale.value = withTiming(minScale.value, { duration: 300 }))
      }
      if (scale.value > maxScale) {
        scale.value = withTiming(maxScale, { duration: 300 })
      }
    },
  })
}
