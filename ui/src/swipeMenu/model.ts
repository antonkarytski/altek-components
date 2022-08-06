import { Animated, PanResponder, ViewStyle } from 'react-native'
import {
  AnimatedModel,
  animationInterpolate,
  fastSpringAnimation,
} from 'altek-toolkit'

export class SwipeController {
  private readonly animatedValue = new Animated.Value(0)

  public readonly panHandlers
  public readonly animatedStyle: Animated.WithAnimatedValue<ViewStyle>

  constructor(model: AnimatedModel) {
    const panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, state) => {
        if (state.dy > 0) {
          this.animatedValue.setValue(state.dy)
        }
      },
      onPanResponderRelease: (_, state) => {
        if (state.dy > 50) {
          model.asyncHide().then(() => {
            this.animatedValue.setValue(0)
          })
          return
        }
        fastSpringAnimation(this.animatedValue, 0).start()
      },
    })

    this.panHandlers = panResponder.panHandlers
    this.animatedStyle = {
      transform: [
        {
          translateY: animationInterpolate(
            model.animatedValue,
            [model.hideValue ?? 0, model.showValue ?? 1],
            [700, 0]
          ),
        },
        { translateY: this.animatedValue },
      ],
    }
  }
}
