import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import CardModal from '../../modal/CardModal'
import { useCommonPopUp, usePopUpRegistration } from '../hook'
import { useControlledTimer, useFnRef } from 'altek-toolkit'
import { usePopUpAutoMount } from '../hook.popUpHelpers'
import Text from '../../text'
import { getPopUpAnimatedStyles, noop } from '../helpers'
import { PopUpManager } from '../model.popUpManager'
import { AdditionalPropsStructure } from '../types.model'
import {
  CommonPopUpNotificationProps,
  NotificationCreateComponentProps,
  PopUpNotificationProps,
} from './types'

export function createPopUpNotificationComponent<
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
>(
  manager: PopUpManager<Names, S>,
  additionalProps?: NotificationCreateComponentProps
) {
  return (props: PopUpNotificationProps<Names>) => {
    return (
      <CommonPopUpNotification
        {...props}
        manager={manager}
        styleOverride={additionalProps?.styles}
      />
    )
  }
}

export default function CommonPopUpNotification<
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
>({
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
  onMount = noop,
  onUnmount = noop,
  manager,
  styleOverride,
}: CommonPopUpNotificationProps<Names, S>) {
  const { isMounted, autoCloseTime, animatedValue, isClosable } =
    useCommonPopUp(popUpName, manager)
  const previousIsMounted = useRef(isMounted)
  const onMountRef = useFnRef(onMount)
  const onUnmountRef = useFnRef(onUnmount)

  const { forceUnmount } = usePopUpAutoMount(popUpName, manager, {
    autoMount,
    preventAutoUnmount,
  })

  useControlledTimer({
    onGenerate: () => manager.hide(popUpName),
    time: autoCloseTime,
    condition: autoCloseTime > 0,
  })

  useEffect(() => {
    if (isMounted && !previousIsMounted.current) {
      previousIsMounted.current = true
      return onMountRef.current()
    }
    if (!isMounted && previousIsMounted.current) {
      previousIsMounted.current = false
      onUnmountRef.current()
    }
  }, [isMounted, onMountRef, onUnmountRef])

  usePopUpRegistration(popUpName, manager)

  if (!isMounted) return null

  const { opacity, yMove } = getPopUpAnimatedStyles(animatedValue)
  const onTouchHandler = () => {
    if (closable && isClosable) forceUnmount()
    if (onTouch) onTouch()
  }

  return (
    <Animated.View
      style={[styles.container, styleOverride?.container, opacity, style]}
    >
      <CardModal
        style={styleOverride?.card}
        preset={preset}
        onTouch={onTouchHandler}
        animatedStyle={yMove}
        title={title}
      >
        {children ? children : <Text label={text} />}
      </CardModal>
    </Animated.View>
  )
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
