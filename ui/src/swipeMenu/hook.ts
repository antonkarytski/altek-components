import { AnimatedModel, useConst } from 'altek-toolkit'
import { SwipeController } from './model'

export function useSwipeController(model: AnimatedModel) {
  return useConst(() => new SwipeController(model))
}
