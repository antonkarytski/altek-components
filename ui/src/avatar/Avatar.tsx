import React, { FC } from 'react'
import { Image, StyleProp, View, ViewStyle } from 'react-native'
import { avatarStyles } from './styles'
import ProfileIcon from '../icons/Icon.Profile'
import { GRAY } from '../colors'

type AvatarProps = {
  size?: number
  style?: StyleProp<ViewStyle>
  uri?: string
  avatarColor?: string
}

const Avatar: FC<AvatarProps> = ({
  children,
  size = 80,
  uri,
  avatarColor = GRAY.COMMON,
  style,
}) => {
  const sizeStyle = {
    height: size,
    width: size,
  }

  return (
    <View style={[avatarStyles.container, sizeStyle, style]}>
      {children}
      {uri ? (
        <Image style={avatarStyles.image} source={{ uri }} />
      ) : (
        <View>
          <ProfileIcon size={size} color={avatarColor} />
        </View>
      )}
    </View>
  )
}

export default Avatar
