import { ReactNode } from 'react'
import { CardModalProps } from '../modal/types'
import { Fn } from 'altek-toolkit'
import { PopUpSubmitOptions } from './types.model'

export type PickOne<T, Field extends keyof T> = Required<Pick<T, Field>> &
  Partial<Record<Exclude<keyof T, Field>, never>>

type PopUpContentType = {
  children: ReactNode
  text: string
}

export type BasePopUpModalProps<Names extends string> = {
  popUpName: Names
  title: string
  closable?: boolean
  autoMount?: boolean
  preventAutoUnmount?: boolean
  onMount?: Fn
  onUnmount?: Fn
} & CardModalProps

export type PopUpModalPropsWithChildren<
  Names extends string
> = BasePopUpModalProps<Names> & PickOne<PopUpContentType, 'children'>
export type PopUpModalPropsWithText<
  Names extends string
> = BasePopUpModalProps<Names> & PickOne<PopUpContentType, 'text'>

export type PopUpModalProps<Names extends string> =
  | PopUpModalPropsWithChildren<Names>
  | PopUpModalPropsWithText<Names>

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

export type SpecifiedModalOptions = {
  popUpNameModifier?: string
}

export type SpecifiedPopUpModalProps<Names extends string> = Partial<
  Omit<PopUpModalProps<Names>, 'popUp'>
> &
  SpecifiedModalOptions

export type SpecifiedPopUpSubmitProps<Names extends string> = Partial<
  Omit<PopUpSubmitProps<Names>, 'popUp'>
> &
  SpecifiedModalOptions
