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

export default ({style, title, onPress}) =>
	<TouchableOpacity
		style={Object.assign({}, styles.default, style)}
		onPress={onPress}
	>
		<Text>{title}</Text>
	</TouchableOpacity >

const styles = StyleSheet.create({
	default: {
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 10
	}
})
