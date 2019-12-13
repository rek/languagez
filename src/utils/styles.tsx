import {StyleSheet} from 'react-native';

import {colours} from './constants'

const styles = StyleSheet.create({
	textInput: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 2,
		margin: 10,
		width: 200,
	}
})

export const textInput = styles.textInput

export const pageStyle = StyleSheet.create({
	default: {
		flex: 1,
		backgroundColor: colours.second,
	},
})
