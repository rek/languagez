import React from 'react';
import {StyleSheet, View, Button, Text, TouchableOpacity} from 'react-native';

export const Active = () => {

}

export const Simple = ({title, onPress}) => {
	return (
		<View style={{
			height: 40,
			margin: 3,
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

	return (
		<TouchableOpacity
			style={[styles.default, style || styles.empty]}
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
