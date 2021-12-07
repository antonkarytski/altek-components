import React, { FC, ReactNode } from 'react'
import {
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import Animated from 'react-native-reanimated'
import Text, { textStyles } from '../text'
import { useExpandableCard, useExpandableCardStyle } from './hook'
import { shadowsStyles } from '../styles'
import { cardsPresets } from '../cards/styles'
import AnimatedArrowIcon from '../iconsAnimated/AnimatedIcon.Arrow'
import { expandableCardStyles } from './styles'

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
  showMoreLabel?: string
  showLessLabel?: string
  textPreset?: Phrases
  expandableContent?: ReactNode
  style?: StyleProp<ViewStyle>
}

const ExpandableCard: FC<ExpandableCardProps> = ({
  style,
  headerLabel = '',
  textPreset: t = PHRASES,
  children,
  expandableContent,
}) => {
  const {
    height,
    rotation,
    onExpandedBodyMount,
    onBodyMount,
    toggleOpen,
    toggleExpanded,
    isExpanded,
    isOpened,
  } = useExpandableCard()

  const aStyle = useExpandableCardStyle({ height, isOpened })

  return (
    <>
      <Animated.View
        style={[
          cardsPresets.deep,
          expandableCardStyles.openButton,
          aStyle.header,
        ]}
      >
        <TouchableOpacity
          style={expandableCardStyles.openButtonInner}
          onPress={toggleOpen}
        >
          <Text
            bold
            style={[textStyles.link, textStyles.font18]}
            label={headerLabel || t.info || ''}
          />
          <AnimatedArrowIcon rotation={rotation} />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          cardsPresets.deep,
          expandableCardStyles.contentWrapper,
          !expandableContent ? expandableCardStyles.bottomBorderRadius : null,
          aStyle.body,
        ]}
      >
        <ScrollView
          nestedScrollEnabled={true}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              expandableContent
                ? expandableCardStyles.mainBlockExpandable
                : expandableCardStyles.mainBlock,
              style,
            ]}
            onLayout={onBodyMount}
          >
            {children}
          </View>
          {expandableContent ? (
            <View onLayout={onExpandedBodyMount}>{expandableContent}</View>
          ) : null}
        </ScrollView>
      </Animated.View>
      {expandableContent && isOpened ? (
        <Animated.View
          style={[
            shadowsStyles.elevation5,
            expandableCardStyles.showMoreButton,
            expandableCardStyles.bottomBorderRadius,
          ]}
        >
          <TouchableOpacity
            style={expandableCardStyles.showMoreButtonInner}
            onPress={toggleExpanded}
          >
            <Text
              medium
              style={textStyles.link}
              label={!isExpanded ? t.showMore : t.showLess}
            />
          </TouchableOpacity>
        </Animated.View>
      ) : null}
    </>
  )
}

export default ExpandableCard
