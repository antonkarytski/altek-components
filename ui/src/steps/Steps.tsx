import React, { ReactNode } from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import Step, { StepProps } from './Step'
import { horizontalStepsStyles, stepsStyles } from './styles'
import { CircleIcon } from '../icons'

type NodeGenerator<T> = (props: T, index: number) => ReactNode

type SpecifiedStepsProps<T> = {
  style?: StyleProp<ViewStyle>
  data: T[]
  children: NodeGenerator<T>
  stepStyle?: StyleProp<ViewStyle>
  colors?: StepProps['colors']
}

type StepsProps<T> = {
  horizontal?: boolean
} & SpecifiedStepsProps<T>

export default function Steps<T>({
  horizontal,
  children,
  ...props
}: StepsProps<T>) {
  if (horizontal)
    return <HorizontalSteps {...props}>{children}</HorizontalSteps>
  return <VerticalSteps {...props}>{children}</VerticalSteps>
}

function VerticalSteps<T>({
  style,
  data,
  children,
  stepStyle,
  colors,
}: SpecifiedStepsProps<T>) {
  return (
    <View style={[stepsStyles.container, style]}>
      {data.map((props, index) => {
        return (
          <Step
            hideLine={index === data.length - 1}
            key={index}
            value={index + 1}
            style={[
              index !== data.length - 1 ? stepsStyles.step : null,
              stepStyle,
            ]}
            colors={colors}
          >
            {children(props, index)}
          </Step>
        )
      })}
    </View>
  )
}

function HorizontalSteps<T>({ style, data, children }: SpecifiedStepsProps<T>) {
  return (
    <View style={[horizontalStepsStyles.container, style]}>
      <View style={horizontalStepsStyles.helpers}>
        {data.map((props, index) => {
          return <CircleIcon key={`helper${index}`} value={index + 1} />
        })}
      </View>

      <View style={horizontalStepsStyles.contentWrap}>
        {data.map((props, index) => {
          return (
            <View style={horizontalStepsStyles.part} key={index}>
              {children(props, index)}
            </View>
          )
        })}
      </View>
    </View>
  )
}
