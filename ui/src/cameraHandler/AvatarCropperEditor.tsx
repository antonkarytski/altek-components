import React, { createRef, useEffect, useRef } from 'react'
import { Dimensions, View } from 'react-native'
import {
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { manipulateAsync } from 'expo-image-manipulator'
import MaskedView from '@react-native-community/masked-view'
import BackButton from '../buttons/Button.Back'
import SendButton from '../buttons/Button.Send'
import { getImageSize } from 'altek-toolkit'
import { EditorProps } from './types'
import { avatarEditorStyles, commonEditorStyles } from './styles'
import { useScaleGestureHandler } from './hook.transformHandlers'

type MoveContext = {
  startX: number
  startY: number
  blocked: boolean
}

type Size = {
  width: number
  height: number
}
const screenSize = Dimensions.get('screen')
const maskK = 0.9
const minSize = screenSize.width * maskK

export default function AvatarCropperEditor({
  onAccept,
  onCancel,
  uri,
}: EditorProps) {
  const minScale = useSharedValue(1)
  const scale = useSharedValue(minScale.value)
  const offsetX = useSharedValue(0)
  const offsetY = useSharedValue(0)
  const imageHeight = useSharedValue(minSize * 1.3333)
  const panHandlerRef = useRef(createRef())
  const sizeRelation = useRef(1)
  const determinedImageSize = useRef<Size>(screenSize)

  useEffect(() => {
    getImageSize(uri).then(({ height, width }) => {
      const k = height / width
      const newHeight = minSize * k
      imageHeight.value = newHeight
      sizeRelation.current = newHeight / height
      determinedImageSize.current = { height, width }
      if (newHeight < minSize) {
        minScale.value = minSize / newHeight
        scale.value = withTiming(minScale.value, { duration: 300 })
        return
      }
      offsetY.value = withTiming(-(newHeight - minSize) / 2, { duration: 50 })
    })
  }, [uri, imageHeight, scale, minScale])

  const scaleHandler = useScaleGestureHandler({
    scale,
    minScale,
    maxScaleStep: 2,
  })

  const moveHandler = useAnimatedGestureHandler({
    onStart(event, ctx: MoveContext) {
      ctx.startX = offsetX.value
      ctx.startY = offsetY.value
    },
    onActive(event, ctx) {
      offsetX.value = Math.ceil(ctx.startX + event.translationX)
      offsetY.value = Math.ceil(ctx.startY + event.translationY)
    },
    onFinish() {
      const maxScale = minScale.value + 2
      const correctScale = (() => {
        if (scale.value < minScale.value) return minScale.value
        if (scale.value > maxScale) return maxScale
        return scale.value
      })()
      const rightMaxOffsetX = -(minSize - minSize / correctScale)
      if (offsetX.value > 0) {
        offsetX.value = withTiming(0, { duration: 300 })
      }
      if (offsetX.value < rightMaxOffsetX) {
        offsetX.value = withTiming(rightMaxOffsetX, { duration: 300 })
      }
      const bottomMaxOffset = -(imageHeight.value - minSize / correctScale)

      if (offsetY.value > 0) {
        offsetY.value = withTiming(0, { duration: 300 })
        return
      }
      if (offsetY.value < bottomMaxOffset) {
        offsetY.value = withTiming(bottomMaxOffset, { duration: 300 })
      }
    },
  })

  const aStyle = useAnimatedStyle(() => ({
    height: imageHeight.value,
    width: minSize,
    marginLeft:
      (screenSize.width - minSize * scale.value) / 2 +
      minSize * (scale.value - 1),
    marginTop: ((screenSize.height - minSize) * scale.value) / 2,
    transform: [
      { scale: scale.value },
      { translateX: offsetX.value },
      { translateY: offsetY.value },
    ],
  }))

  async function getCroppedImage() {
    try {
      const size = Math.min(
        minSize / (sizeRelation.current * scale.value),
        determinedImageSize.current.width,
        determinedImageSize.current.height
      )
      const originX = -offsetX.value / sizeRelation.current
      const originY = -offsetY.value / sizeRelation.current
      const imageData = await manipulateAsync(uri, [
        { resize: determinedImageSize.current },
        { crop: { originX, originY, height: size, width: size } },
      ])
      return imageData.uri
    } catch {
      return uri
    }
  }

  return (
    <View style={avatarEditorStyles.container}>
      <PanGestureHandler
        onGestureEvent={moveHandler}
        ref={panHandlerRef.current}
      >
        <Animated.View style={avatarEditorStyles.animatedContainer}>
          <PinchGestureHandler
            onGestureEvent={scaleHandler}
            simultaneousHandlers={panHandlerRef.current}
          >
            <Animated.View style={avatarEditorStyles.animatedContainer}>
              <MaskedView
                style={avatarEditorStyles.maskContainer}
                maskElement={
                  <View style={avatarEditorStyles.mask}>
                    <View style={avatarEditorStyles.circle} />
                  </View>
                }
              >
                <Animated.Image
                  source={{ uri }}
                  style={[avatarEditorStyles.image, aStyle]}
                />
              </MaskedView>
            </Animated.View>
          </PinchGestureHandler>
        </Animated.View>
      </PanGestureHandler>

      <BackButton style={commonEditorStyles.backButton} onPress={onCancel} />
      <SendButton
        style={commonEditorStyles.sendButton}
        onPress={async () => {
          const croppedUri = await getCroppedImage()
          onAccept({ uri: croppedUri })
        }}
        color={'#FFF'}
        size={30}
      />
    </View>
  )
}
