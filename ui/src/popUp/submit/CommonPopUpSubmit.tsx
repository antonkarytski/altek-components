import React from 'react'
import { StyleSheet } from 'react-native'
import SubmitModal from '../../modal/SubmitModal'
import { useCommonPopUp, usePopUpRegistration } from '../hook'
import { getPopUpAnimatedStyles, noop } from '../helpers'
import { useControlledTimer } from 'altek-toolkit'
import { usePopUpAutoMount } from '../hook.popUpHelpers'
import Text from '../../text'
import { PopUpManager } from '../model.popUpManager'
import { AdditionalPropsStructure } from '../types.model'
import {
  CommonPopUpSubmitProps,
  PopUpSubmitProps,
  PopUpSubmitTextDriver,
} from './types'

const defaultTextDriver: PopUpSubmitTextDriver = {
  no: 'No',
  yes: 'Yes',
}

export function createPopUpSubmitComponent<
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
>(manager: PopUpManager<Names, S>) {
  return (props: PopUpSubmitProps<Names>) => {
    return <CommonPopUpSubmit {...props} manager={manager} />
  }
}

export default function CommonPopUpSubmit<
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
>({
  popUpName,
  text: popUpText,
  title,
  submitButtonLabel,
  rejectButtonLabel,
  onReject = noop,
  onSubmit = noop,
  disableRejectButton,
  autoMount,
  children,
  preset,
  manager,
  textDriver = defaultTextDriver,
  preventAutoUnmount,
  closable = true,
}: CommonPopUpSubmitProps<Names, S>) {
  const {
    isMounted,
    isClosable,
    autoCloseTime,
    animatedValue,
    onSubmit: onPassedSubmit = noop,
    onReject: onPassedReject = noop,
  } = useCommonPopUp(popUpName, manager)

  const { forceUnmount } = usePopUpAutoMount(popUpName, manager, {
    autoMount,
    preventAutoUnmount,
  })

  useControlledTimer({
    onGenerate: () => manager.hide(popUpName),
    time: autoCloseTime,
    condition: autoCloseTime > 0,
  })

  usePopUpRegistration(popUpName, manager)

  if (!isMounted) return null

  const { opacity } = getPopUpAnimatedStyles(animatedValue)

  const closeModal = () => {
    forceUnmount()
    onReject()
    onPassedReject()
  }

  const submitModal = () => {
    if(closable && isClosable) forceUnmount()
    onSubmit()
    onPassedSubmit()
  }

  return (
    <SubmitModal
      title={title}
      submitLabel={submitButtonLabel || textDriver.yes}
      rejectLabel={rejectButtonLabel || textDriver.no}
      onReject={!disableRejectButton ? closeModal : undefined}
      onSubmit={submitModal}
      animStyle={opacity}
      preset={preset}
    >
      {children ? (
        children
      ) : (
        <Text medium style={styles.text} label={popUpText} />
      )}
    </SubmitModal>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.01,
    textAlign: 'center',
  },
})
