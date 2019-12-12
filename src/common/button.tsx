import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const Active = () => {

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
