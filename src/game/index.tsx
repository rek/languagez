import React from 'react'
import {StyleSheet, View, Text} from 'react-native';

import {pageStyle} from '../utils/styles'

function GameModule() {
	return (
		<View style={pageStyle.default}>
			<Text>Game on@</Text>
		</View>
	)
}

GameModule.navigationOptions = {title: 'Game'}

export default GameModule
