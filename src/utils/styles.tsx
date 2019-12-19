import {StyleSheet} from 'react-native';

import {colours} from './constants'

const styles = StyleSheet.create({
	textInput: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		padding: 2,
		paddingLeft: 4,
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

export const modalStyle = StyleSheet.create({
	middle: {
		backgroundColor: colours.active,
		padding: 12,
		justifyContent: 'center',
		// alignItems: 'center',
		borderRadius: 4,
		borderColor: 'rgba(0, 0, 0, 0.1)',
	},
})
