import React, {FC} from 'react'
import {Image, StyleProp, View, ViewStyle} from 'react-native'
import {avatarStyles} from "./styles";

type AvatarProps = {
	size?: number
	style?: StyleProp<ViewStyle>
	uri?: string
}

const Avatar: FC<AvatarProps> = ({ children, size = 80, uri }) => {
	const sizeStyle = {
		height: size,
		width: size,
	}
	
	return (
		<View style={[avatarStyles.container, sizeStyle]}>
			{children}
			{uri ? (
				<Image style={avatarStyles.image} source={{ uri }} />
			) : (
				<View />
			)}
		</View>
	)
}

export default Avatar
