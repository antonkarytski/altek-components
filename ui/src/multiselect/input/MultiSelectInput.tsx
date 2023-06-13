import React, { PropsWithChildren } from 'react'
import { MultiSelectInputProps } from '../types'
import InsideMultiSelectInput from './InsideMultiSelectInput'
import UnderMultiSelectInput from './UnderMultiSelectInput'

const MultiSelectInput = ({
  type = 'inside',
  children,
  ...props
}: PropsWithChildren<MultiSelectInputProps>) => {
  if (type === 'inside') {
    return (
      <InsideMultiSelectInput {...props}>{children}</InsideMultiSelectInput>
    )
  }

  return <UnderMultiSelectInput {...props}>{children}</UnderMultiSelectInput>
}

export default MultiSelectInput
