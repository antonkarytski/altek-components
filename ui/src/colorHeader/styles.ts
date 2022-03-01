import { StyleSheet } from 'react-native'
import { GRAY } from '../../styles/colors'

export const colorHeaderStyles = StyleSheet.create({
  arrow: {
    marginLeft: 'auto',
  },
  header: {
    flexDirection: 'row',
    height: 38,
    borderBottomWidth: 1,
    borderColor: GRAY.LIGHT_BORDER,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderTopRightRadius: 12,
    borderTopStartRadius: 12,
  },
  headerWithArrow: {
    justifyContent: 'flex-start',
  },
  headerTitle: {
    fontSize: 16,
    lineHeight: 21,
  },
})
