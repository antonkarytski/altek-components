import { AdditionalPropsStructure } from '../types.model'
import { PopUpModalProps } from '../types'
import { PopUpManager } from '../model.popUpManager'

export type CommonPopUpNotificationProps<
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
> = PopUpModalProps<Names> & { manager: PopUpManager<Names, S> }
