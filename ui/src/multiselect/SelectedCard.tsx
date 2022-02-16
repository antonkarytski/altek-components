import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { CrossIcon } from '../icons'
import { MultiSelectModes } from './types'
import { multiSelectStyles } from './styles'
import { BLUE } from '../colors'

type SelectedCardProps = {
  label: string
  onPress?: () => void
  hideRemoveButton?: boolean
  type?: MultiSelectModes['selectedItemsType']
}

export default function SelectedCard({
  label,
  onPress,
  hideRemoveButton,
  type = 'empty',
}: SelectedCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.card,
          type === 'empty'
            ? multiSelectStyles.emptyCard
            : multiSelectStyles.filledCard,
          !hideRemoveButton ? styles.cardWithRemoveButton : null,
        ]}
      >
        <Text
          style={[
            styles.text,
            type === 'filled' ? multiSelectStyles.cardText : null,
            !hideRemoveButton ? styles.textWithRemoveButton : null,
          ]}
        >
          {label}
        </Text>
        {!hideRemoveButton ? <CrossIcon size={10} color={BLUE.BORDER} /> : null}
      </View>
    </TouchableOpacity>
  )
}

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
