import React, { FC, ReactNode, useEffect, useState } from 'react'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import Animated, {
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated'
import Text, { textStyles } from '../text'
import { shadowsStyles } from '../styles'
import { cardsPresets } from '../cards/styles'
import { expandableCardStyles } from './styles'
import { Fn, useToggle } from 'altek-toolkit'
import ExpandablePart from './ExpandablePart'
import ExpandableCardHeader from './ExpandableCardHeader'

type Phrases = {
  showMore: string
  showLess: string
  info: string
}

const PHRASES: Phrases = {
  info: 'Info',
  showMore: 'Show more',
  showLess: 'Show less',
}

type ExpandableCardProps = {
  headerLabel?: string
  textPreset?: Phrases
  expandableContent?: ReactNode
  style?: StyleProp<ViewStyle>
  buttonsColor?: string
}

function useSharedToggle(initialValue: number, secondValue: number) {
  const shared = useSharedValue(initialValue)
  function toggle() {
    shared.value = shared.value === initialValue ? secondValue : initialValue
  }
  return [shared, toggle] as [SharedValue<number>, Fn]
}

const ExpandableCard: FC<ExpandableCardProps> = ({
  style,
  headerLabel = '',
  textPreset: t = PHRASES,
  children,
  expandableContent,
  buttonsColor,
}) => {
  const [isInitiated, setIsInitiated] = useState(false)
  const [isExpanded, toggleExpanded] = useToggle(false)
  const [openedValue, toggleOpened] = useSharedToggle(1, 0)
  const expandedValue = useSharedValue(0)

  const openedAndExpanded = useDerivedValue(() => {
    return expandedValue.value * openedValue.value
  }, [])

  useEffect(() => {
    expandedValue.value = Number(isExpanded)
  }, [isExpanded, openedValue])

  return (
    <Animated.View
      style={[
        cardsPresets.common,
        shadowsStyles.elevation2,
        expandableCardStyles.container,
        style,
      ]}
      onLayout={() => setIsInitiated(true)}
    >
      <ExpandableCardHeader
        label={headerLabel || t?.info}
        onPress={toggleOpened}
        animatedValue={openedValue}
        textColor={buttonsColor}
      />
      <ExpandablePart
        isInitiated={isInitiated}
        animateValue={openedValue}
        style={expandableCardStyles.part}
      >
        {children}
      </ExpandablePart>
      {expandableContent ? (
        <>
          <ExpandablePart
            isInitiated={isInitiated}
            animateValue={openedAndExpanded}
            style={expandableCardStyles.part}
          >
            {expandableContent}
          </ExpandablePart>
          <ExpandablePart isInitiated={isInitiated} animateValue={openedValue}>
            <TouchableOpacity
              onPress={toggleExpanded}
              style={expandableCardStyles.expandButton}
            >
              <Text
                medium
                style={[
                  textStyles.link,
                  buttonsColor ? { color: buttonsColor } : null,
                ]}
                label={!isExpanded ? t.showMore : t.showLess}
              />
            </TouchableOpacity>
          </ExpandablePart>
        </>
      ) : null}
    </Animated.View>
  )
}

export default ExpandableCard
