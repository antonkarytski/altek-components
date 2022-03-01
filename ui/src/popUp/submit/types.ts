import { AdditionalPropsStructure, PopUpSubmitOptions } from '../types.model'
import { PopUpModalProps, SpecifiedModalOptions } from '../types'
import { PopUpManager } from '../model.popUpManager'

export type PopUpSubmitTextDriver = {
  yes: string
  no: string
}
export type PopUpSubmitProps<Names extends string> = {
  submitButtonLabel?: string
  rejectButtonLabel?: string
  disableRejectButton?: boolean
  textDriver?: PopUpSubmitTextDriver
} & Omit<PopUpModalProps<Names>, 'closable' | 'statusColor'> &
  PopUpSubmitOptions

export type SpecifiedPopUpSubmitProps<Names extends string> = Partial<
  Omit<PopUpSubmitProps<Names>, 'popUp'>
> &
  SpecifiedModalOptions

export type CommonPopUpSubmitProps<
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
> = PopUpSubmitProps<Names> & {
  manager: PopUpManager<Names, S>
}
