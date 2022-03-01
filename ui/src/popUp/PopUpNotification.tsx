import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import CardModal from '../modal/CardModal'
import { useCommonPopUp, usePopUpRegistration } from './hook'
import { useControlledTimer } from 'altek-toolkit'
import { usePopUpAutoMount } from './hook.popUpHelpers'
import { PopUpModalProps } from './types'
import Text from '../text'
import { getPopUpAnimatedStyles } from './helpers'
import { PopUpManager } from './model.popUpManager'

type CommonPopUpNotificationProps<
  Names extends string
> = PopUpModalProps<Names> & {
  manager: PopUpManager<Names>
}

export function createPopUpNotificationComponent<
  Names extends string,
  M extends PopUpManager<Names>
>(manager: M) {
  return (props: PopUpModalProps<Names>) => {
    return <PopUpNotification {...props} manager={manager} />
  }
}

export function PopUpNotification<Names extends string>({
  text,
  title,
  preset,
  popUpName,
  autoMount,
  style,
  closable = true,
  onTouch,
  preventAutoUnmount,
  children,
  onMount,
  onUnmount,
  manager,
}: CommonPopUpNotificationProps<Names>) {
  const {
    isMounted,
    autoCloseTime,
    animatedValue,
    isClosable,
  } = useCommonPopUp(popUpName, manager)
  const previousMounted = useRef(isMounted)
  const onMountRef = useRef(onMount)
  const onUnmountRef = useRef(onUnmount)
  onMountRef.current = onMount
  onUnmountRef.current = onUnmount

  const { forceUnmount } = usePopUpAutoMount(popUpName, manager, {
    autoMount,
    preventAutoUnmount,
  })

  const { opacity, yMove } = getPopUpAnimatedStyles(animatedValue)
  usePopUpRegistration(popUpName, manager)

  useControlledTimer({
    onGenerate: () => manager.hide(popUpName),
    time: autoCloseTime,
    condition: autoCloseTime > 0,
  })

  const onTouchHandler = () => {
    if (closable && isClosable) {
      forceUnmount()
    }
    if (onTouch) onTouch()
  }

  useEffect(() => {
    if (isMounted && !previousMounted.current) {
      previousMounted.current = true
      if (onMountRef.current) onMountRef.current()
      return
    }
    if (!isMounted && previousMounted.current) {
      previousMounted.current = false
      if (onUnmountRef.current) onUnmountRef.current()
    }
  }, [isMounted])

  if (isMounted) {
    return (
      <Animated.View style={[styles.container, opacity, style]}>
        <CardModal
          preset={preset}
          onTouch={onTouchHandler}
          style={yMove}
          title={title}
        >
          {children ? children : <Text label={text} />}
        </CardModal>
      </Animated.View>
    )
  }
  return null
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    top: 63,
    zIndex: 5,
    elevation: 100,
  },
})
