import { ReactNode } from 'react'
import { CardModalProps } from '../modal/types'
import { Fn } from 'altek-toolkit'

export type PickOne<T, Field extends keyof T> = Required<Pick<T, Field>> &
  Partial<Record<Exclude<keyof T, Field>, never>>

export type PopUpContentType = {
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

type PopUpPropsWithChildren<P extends BasePopUpModalProps<string>> = P &
  PickOne<PopUpContentType, 'text'>

type PopUpPropsWithText<P extends BasePopUpModalProps<string>> = P &
  PickOne<PopUpContentType, 'children'>

export type PopUpPropsWithContent<P extends BasePopUpModalProps<string>> =
  | PopUpPropsWithChildren<P>
  | PopUpPropsWithText<P>

export type SpecifiedModalOptions = {
  popUpNameModifier?: string
}
