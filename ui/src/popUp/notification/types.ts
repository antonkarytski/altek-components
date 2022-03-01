import { AdditionalPropsStructure } from '../types.model'
import { PopUpManager } from '../model.popUpManager'
import {
  BasePopUpModalProps,
  PopUpPropsWithContent,
  SpecifiedModalOptions,
} from '../types'

export type PopUpNotificationProps<
  Names extends string
> = PopUpPropsWithContent<BasePopUpModalProps<Names>>

export type CommonPopUpNotificationProps<
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
> = PopUpNotificationProps<Names> & { manager: PopUpManager<Names, S> }

export type SpecifiedPopUpNotificationProps<Names extends string> = Partial<
  Omit<PopUpNotificationProps<Names>, 'popUp'>
> &
  SpecifiedModalOptions
