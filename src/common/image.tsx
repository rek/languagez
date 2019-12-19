import React from 'react'

import {StyleSheet, Image} from 'react-native';

interface TProps {
	base64: string,
	style?: any
}
const Base64Image: React.SFC<TProps> = ({base64, style}) =>
	<Image source={{uri: `data:image/png;base64,${base64}`}} style={style || styles.default} />

const styles = StyleSheet.create({
	default: {
		height: 60,
		width: 60
	}
})

export default Base64Image