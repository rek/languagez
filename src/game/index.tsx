import React from 'react'
import {StyleSheet, View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'

import {pageStyle} from '../utils/styles'

function GameModule({navigation}) {
	const id = navigation.state.params.id
	console.log('id', id)
	const levels = useSelector(state => state.LevelReducer.levels)
	const history = useSelector(state => state.GameReducer.history)

	console.log('levels', levels)
	console.log('history', history)

	return (
		<View style={pageStyle.default}>
			<Text>Game id: {id}</Text>
		</View>
	)
}

GameModule.navigationOptions = {title: 'Game'}

export default GameModule
