import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StyledButton from '../common/button'
import {colours} from '../utils/constants'

export const Menus = ({navigation}) => {
	const loadPage = (name: string) => () => navigation.navigate(name)

	const ActiveButton = ({title, id}) =>
		<StyledButton
			style={navigation.state.routeName === id ? styles.active : styles.inactive}
			title={title}
			onPress={loadPage(id)}
		/>

	return (
		<View style={styles.menus}>
			<ActiveButton title='Show levels' id='show' />
			<ActiveButton title='Add level' id='add' />
			<ActiveButton title='Feedback' id='feedback' />
			<ActiveButton title='Misc' id='misc' />
		</View>
	)
}

const styles = StyleSheet.create({
	menus: {
		flexDirection: 'row',
		marginBottom: 10,
	},
	inactive: {
		backgroundColor: colours.active,
	},
	active: {
		backgroundColor: colours.title,
	}
});
