import React, { PropsWithChildren } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { CircleIcon } from '../icons'
import { stepStyles } from './styles'
import { elementsStyles } from '../styles'

export type StepProps = {
  value: string | number
  hideLine?: boolean
  style?: StyleProp<ViewStyle>
  wrapperStyle?: StyleProp<ViewStyle>
  marksStyle?: StyleProp<ViewStyle>
  colors?: {
    circleBody?: string
    circleBorder?: string
    circleText?: string
    line?: string
  }
}

const Step = ({
  value,
  children,
  hideLine,
  style,
  wrapperStyle,
  marksStyle,
  colors,
}: PropsWithChildren<StepProps>) => {
  return (
    <View style={[stepStyles.container, wrapperStyle]}>
      <View style={[stepStyles.marks, marksStyle]}>
        <CircleIcon
          color={colors?.circleBody}
          borderColor={colors?.circleBorder}
          textColor={colors?.circleText}
          value={value}
        />
        {!hideLine ? (
          <View
            style={[
              elementsStyles.verticalLine,
              stepStyles.line,
              colors?.line ? { borderColor: colors.line } : null,
            ]}
          />
        ) : null}
      </View>
      <View style={[stepStyles.contentContainer, style]}>{children}</View>
    </View>
  )
}

export default Step
