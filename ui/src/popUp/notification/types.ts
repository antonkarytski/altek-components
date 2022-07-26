import { AdditionalPropsStructure } from '../types.model'
import { PopUpManager } from '../model.popUpManager'
import {
  BasePopUpModalProps,
  PopUpPropsWithContent,
  SpecifiedModalOptions,
} from '../types'
import { StyleProp, ViewStyle } from 'react-native'
import { CardModalProps } from '../../modal/types'

type NotificationStylesOverride = {
  container?: StyleProp<ViewStyle>
  card?: CardModalProps['style']
}

export type PopUpNotificationProps<Names extends string> =
  PopUpPropsWithContent<BasePopUpModalProps<Names>>

export type CommonPopUpNotificationProps<
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
> = PopUpNotificationProps<Names> & {
  manager: PopUpManager<Names, S>
  styleOverride?: NotificationStylesOverride
}

export type SpecifiedPopUpNotificationProps<Names extends string> = Partial<
  Omit<PopUpNotificationProps<Names>, 'popUp'>
> &
  SpecifiedModalOptions

export type NotificationCreateComponentProps = {
  styles: NotificationStylesOverride
}
