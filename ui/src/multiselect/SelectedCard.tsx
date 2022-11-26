import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'
import { CrossIcon } from '../icons'
import { MultiSelectModes } from './types'
import { multiSelectStyles } from './styles'
import { BLUE } from '../colors'

export type SelectCardStyles = {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  iconStyle?: TextStyle
}

type SelectedCardProps = {
  label: string
  onPress?: (index: number, value: boolean) => void
  hideRemoveButton?: boolean
  type?: MultiSelectModes['selectedItemsType']
  index: number
} & SelectCardStyles

const SelectedCard = React.memo(
  ({
    label,
    onPress,
    hideRemoveButton,
    type = 'empty',
    index,
    style,
    textStyle,
    iconStyle,
  }: SelectedCardProps) => {
    return (
      <TouchableOpacity onPress={() => onPress?.(index, false)}>
        <View
          style={[
            styles.card,
            type === 'empty'
              ? multiSelectStyles.emptyCard
              : multiSelectStyles.filledCard,
            style,
            !hideRemoveButton ? styles.cardWithRemoveButton : null,
          ]}
        >
          <Text
            style={[
              styles.text,
              type === 'filled' ? multiSelectStyles.cardText : null,
              textStyle,
              !hideRemoveButton ? styles.textWithRemoveButton : null,
            ]}
          >
            {label}
          </Text>
          {!hideRemoveButton ? (
            <CrossIcon size={10} color={iconStyle?.color || BLUE.BORDER} />
          ) : null}
        </View>
      </TouchableOpacity>
    )
  }
)

export default SelectedCard

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
    marginBottom: 6,
  },
  cardWithRemoveButton: {
    paddingRight: 10,
    justifyContent: 'flex-start',
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
  },
  textWithRemoveButton: {
    marginRight: 10,
  },
})
