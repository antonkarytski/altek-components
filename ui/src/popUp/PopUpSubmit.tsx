import React from 'react'
import { StyleSheet } from 'react-native'
import SubmitModal from '../modal/SubmitModal'
import { useCommonPopUp, usePopUpRegistration } from './hook'
import { getPopUpAnimatedStyles } from './helpers'
import { useControlledTimer } from 'altek-toolkit'
import { usePopUpAutoMount } from './hook.popUpHelpers'
import { noop } from './helpers'
import Text from '../text'
import { PopUpManager } from './model.popUpManager'
import { PopUpSubmitProps, PopUpSubmitTextDriver } from './types'

type CommonPopUpSubmitProps<Names extends string> = PopUpSubmitProps<Names> & {
  manager: PopUpManager<Names>
}

const defaultTextDriver: PopUpSubmitTextDriver = {
  no: 'No',
  yes: 'Yes',
}

export function createPopUpSubmitComponent<Names extends string>(
  manager: PopUpManager<Names>
) {
  return (props: PopUpSubmitProps<Names>) => {
    return <PopUpSubmit {...props} manager={manager} />
  }
}

export default function PopUpSubmit<Names extends string>({
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
}: CommonPopUpSubmitProps<Names>) {
  const {
    isMounted,
    autoCloseTime,
    animatedValue,
    onSubmit: onPassedSubmit = () => {},
    onReject: onPassedReject = () => {},
  } = useCommonPopUp(popUpName, manager)

  const { forceUnmount } = usePopUpAutoMount(popUpName, manager, {
    autoMount,
  })

  const { opacity } = getPopUpAnimatedStyles(animatedValue)

  useControlledTimer({
    onGenerate: () => manager.hide(popUpName),
    time: autoCloseTime,
    condition: autoCloseTime > 0,
  })

  const closeModal = () => {
    forceUnmount()
    onReject()
    onPassedReject()
  }

  const submitModal = () => {
    forceUnmount()
    onSubmit()
    onPassedSubmit()
  }

  usePopUpRegistration(popUpName, manager)

  if (!isMounted) return null
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
