import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import Button from '../common/button'

import Title from '../common/title'
import {colours} from '../utils/constants'

const OneLevel = ({name, onPress}) =>
	<Button onPress={onPress} style={[styles.listItems]}>
		<Title title={name} />
	</Button>

interface Props {
	handleClick: (id: number) => void,
}

const ListLevels: React.SFC<Props> = ({handleClick}) => {
	const levels = useSelector(state => state.LevelReducer.levels)
	// console.log('levels', levels)

	const onPress = (id) => () => handleClick(id)

	return (
		<View>
			{levels.map((level) => <OneLevel key={level.id} onPress={onPress(level.id)} name={`${level.title} - ${level.progress}/${level.total}`} />)}
		</View>
	)
}

const styles = StyleSheet.create({
	listItems: {
		backgroundColor: colours.second,
		alignItems: 'flex-start',
	}
})

export default ListLevels
