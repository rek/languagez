import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

import Levels from './levels'
import {colours} from '../utils/constants'
import {pageStyle} from '../utils/styles'

export default function DashboardModule({
	navigation,
}) {
	const handleClick = (id: number) => {
		navigation.navigate('game', {id})
	}

	return (
		<View style={[styles.container, pageStyle.default]}>
			<View style={{flex: 4, margin: 10}}>
				<Levels handleClick={handleClick} />
			</View>
			<View style={{flex: 2, backgroundColor: colours.second}}>
				<View style={{
					flex: 1,
					flexDirection: 'column',
					margin: 10,
				}}>
					<View style={{
						marginBottom: 20,
					}}>
						<Button
							title="Feedback"
							onPress={() => navigation.navigate('feedback')}
						/>
					</View>
					<Button
						title="Admin"
						onPress={() => navigation.navigate('admin')}
					/>
				</View>
			</View>
		</View>
	)
}
DashboardModule.navigationOptions = {title: 'Home'}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
})
