import React from 'react';
import {StyleSheet, View, Button, Text, TouchableOpacity} from 'react-native';

export const Active = () => {

}

export const Simple = ({title, onPress, styles = {}}) => {
	return (
		<View style={{
			height: 40,
			margin: 3,
			...styles
		}}>
			<Button
				title={title}
				onPress={onPress}
			/>
		</View>
	)
}

interface CustomProps {
	style?: any,
	title?: string,
	children?: React.ReactElement,
	onPress: () => void,
}
const Custom: React.SFC<CustomProps> = ({
	style, title, onPress, children
}) => {
	let stylesToAdd = [styles.empty]

	if (style) {
		stylesToAdd = Array.isArray(style) ? style : [style]
	}

	return (
		<TouchableOpacity
			style={[styles.default, stylesToAdd]}
			onPress={onPress}
		>
			{children || <Text>{title}</Text>}
		</TouchableOpacity >
	)
}

const styles = StyleSheet.create({
	default: {
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 10
	},
	empty: {}
})

export default Custom
