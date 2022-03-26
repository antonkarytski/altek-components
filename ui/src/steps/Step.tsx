import React, { FC } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { CircleIcon } from '../icons'
import { stepStyles } from './styles'
import { elementsStyles } from '../styles'

type StepProps = {
  value: string | number
  hideLine?: boolean
  style?: StyleProp<ViewStyle>
  wrapperStyle?: StyleProp<ViewStyle>
}

const Step: FC<StepProps> = ({
  value,
  children,
  hideLine,
  style,
  wrapperStyle,
}) => {
  return (
    <View style={[stepStyles.container, wrapperStyle]}>
      <View style={stepStyles.marks}>
        <CircleIcon value={value} />
        {!hideLine ? (
          <View style={[elementsStyles.verticalLine, stepStyles.line]} />
        ) : null}
      </View>
      <View style={[stepStyles.contentContainer, style]}>{children}</View>
    </View>
  )
}

export default Step
