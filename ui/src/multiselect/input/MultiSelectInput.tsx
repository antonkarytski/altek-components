import React, { FC } from 'react'
import { MultiSelectInputProps } from '../types'
import InsideMultiSelectInput from './InsideMultiSelectInput'
import UnderMultiSelectInput from './UnderMultiSelectInput'

const MultiSelectInput: FC<MultiSelectInputProps> = ({
  type = 'inside',
  children,
  ...props
}) => {
  if (type === 'inside') {
    return (
      <InsideMultiSelectInput {...props}>{children}</InsideMultiSelectInput>
    )
  }

  return <UnderMultiSelectInput {...props}>{children}</UnderMultiSelectInput>
}

export default MultiSelectInput
