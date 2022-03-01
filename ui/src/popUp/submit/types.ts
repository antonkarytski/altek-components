import { AdditionalPropsStructure, PopUpSubmitOptions } from '../types.model'
import {
  BasePopUpModalProps,
  PopUpPropsWithContent,
  SpecifiedModalOptions,
} from '../types'
import { PopUpManager } from '../model.popUpManager'

export type PopUpSubmitTextDriver = {
  yes: string
  no: string
}

export type PopUpSubmitBaseProps<Names extends string> = {
  submitButtonLabel?: string
  rejectButtonLabel?: string
  disableRejectButton?: boolean
  textDriver?: PopUpSubmitTextDriver
} & Omit<BasePopUpModalProps<Names>, 'closable' | 'statusColor'> &
  PopUpSubmitOptions

export type PopUpSubmitProps<Names extends string> = PopUpPropsWithContent<
  PopUpSubmitBaseProps<Names>
>

export type CommonPopUpSubmitProps<
  Names extends string,
  S extends AdditionalPropsStructure<Names> = AdditionalPropsStructure<Names>
> = PopUpSubmitProps<Names> & {
  manager: PopUpManager<Names, S>
}

export type SpecifiedPopUpSubmitProps<Names extends string> = Partial<
  Omit<PopUpSubmitProps<Names>, 'popUp'>
> &
  SpecifiedModalOptions
