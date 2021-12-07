import { useCallback, useEffect, useState } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { LayoutChangeEvent } from 'react-native'
import { useToggle, useFnRef } from 'altek-toolkit'

type UseInfoCardSetting = {
  initBodyHeight?: number
  initExpansionHeight?: number
  initIsExpanded?: boolean
  initIsOpened?: boolean
}

export function useExpandableCard({
  initBodyHeight = 200,
  initExpansionHeight = 0,
  initIsExpanded = false,
  initIsOpened = true,
}: UseInfoCardSetting = {}) {
  const [isExpanded, toggleExpanded] = useToggle(initIsExpanded)
  const [isOpened, toggleOpen] = useToggle(initIsOpened)
  const [bodyHeight, setBodyHeight] = useState(initBodyHeight)
  const [expansionHeight, setExpansionHeight] = useState(initExpansionHeight)
  const expandedBodyHeight = expansionHeight + bodyHeight

  const height = useSharedValue(bodyHeight)
  const rotation = useSharedValue(1)
  const showMore = useFnRef(() => {
    height.value = expandedBodyHeight
  })

  const showLess = useFnRef(() => {
    height.value = bodyHeight
  })

  const show = useCallback(() => {
    height.value = isExpanded ? expandedBodyHeight : bodyHeight
    rotation.value = 180
  }, [height, rotation, isExpanded, expandedBodyHeight, bodyHeight])

  const hide = useFnRef(() => {
    height.value = 0
    rotation.value = 0
  })

  const onBodyMount = useCallback((event: LayoutChangeEvent) => {
    setBodyHeight(event.nativeEvent.layout.height)
  }, [])

  const onExpandedBodyMount = useCallback((event: LayoutChangeEvent) => {
    setExpansionHeight(event.nativeEvent.layout.height)
  }, [])

  useEffect(() => {
    if (isOpened) return show()
    hide.current()
  }, [isOpened, show, hide])

  useEffect(() => {
    if (isExpanded) return showMore.current()
    showLess.current()
  }, [isExpanded, showLess, showMore])

  return {
    height,
    rotation,
    toggleExpanded,
    toggleOpen,
    isOpened,
    isExpanded,
    onBodyMount,
    onExpandedBodyMount,
  }
}

type UseExpandableCardStyleProps = {
  isOpened: boolean
  height: Animated.SharedValue<number>
}

export function useExpandableCardStyle({
  isOpened,
  height,
}: UseExpandableCardStyleProps) {
  const headerBorderRadius = useSharedValue(8)
  const headerBorderWidth = useSharedValue(1)

  if (isOpened) {
    headerBorderRadius.value = 0
    headerBorderWidth.value = 1
  }

  const body = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, { duration: 300 }, () => {
        if (isOpened) return
        headerBorderRadius.value = 8
        headerBorderWidth.value = 0
      }),
    }
  })

  const header = useAnimatedStyle(() => ({
    borderBottomWidth: headerBorderWidth.value,
    borderBottomLeftRadius: headerBorderRadius.value,
    borderBottomRightRadius: headerBorderRadius.value,
  }))

  return { body, header }
}
