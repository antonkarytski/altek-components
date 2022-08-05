import { expandableCardStyles } from './styles'
import { TouchableOpacity } from 'react-native'
import Text, { textStyles } from '../text'
import AnimatedArrowIcon from '../iconsAnimated/AnimatedIcon.Arrow'
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import React from 'react'
import { Fn } from 'altek-toolkit'

type ExpandableCardHeaderProps = {
  onPress: Fn
  label?: string
  animatedValue: SharedValue<number>
}

export default function ExpandableCardHeader({
  onPress,
  label,
  animatedValue,
}: ExpandableCardHeaderProps) {
  const aStyles = useAnimatedStyle(() => {
    return {
      borderBottomWidth: withTiming(animatedValue.value, { duration: 150 }),
    }
  })

  return (
    <Animated.View style={[expandableCardStyles.openButtonContainer, aStyles]}>
      <TouchableOpacity
        style={expandableCardStyles.openButton}
        onPress={onPress}
      >
        <Text bold style={[textStyles.link, textStyles.font18]} label={label} />
        <AnimatedArrowIcon animatedValue={animatedValue} />
      </TouchableOpacity>
    </Animated.View>
  )
}
