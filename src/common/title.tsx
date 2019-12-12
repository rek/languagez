import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colours} from '../utils/constants';

const styles = StyleSheet.create({
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
		margin: 10,
		color: colours.title
	},
})

interface Props {
	title: string
}

const Component: React.SFC<Props> = ({title}) => {
	return (
		<Text
			style={styles.titleText}
		>
			{title}
		</Text>
	)
}

export default Component
