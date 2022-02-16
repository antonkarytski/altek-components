import { ReactElement } from 'react'

type ConditionalWrapperProps = {
  children: ReactElement
  wrapper: (children: ReactElement) => ReactElement
  condition: boolean | undefined | null
}

export default function ConditionalWrapper({
  children,
  wrapper,
  condition,
}: ConditionalWrapperProps) {
  return condition ? wrapper(children) : children
}
