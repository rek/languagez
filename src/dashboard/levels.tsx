import React from 'react';
import {StyleSheet, View} from 'react-native';

import Button from '../common/button'

import Title from '../common/title'

import {get} from '../store/levels'
import {getProgress} from '../store/game'
import {useUser} from '../store/user'

import {colours} from '../utils/constants'

const OneLevel = ({name, onPress}) =>
	<Button onPress={onPress} style={[styles.listItems]}>
		<Title title={name} />
	</Button>

interface Props {
	handleClick: (id: number) => void,
}

const ListLevels: React.SFC<Props> = ({handleClick}) => {
	// const levels = get()
	const [user] = useUser()
	const levels = getProgress(user, get())
	console.log('levels', levels)

	const onPress = (id) => () => handleClick(id)

	let display = []

	for (const id in levels) {
		const level = levels[id]
		display.push(
			<OneLevel key={level.id} onPress={onPress(level.id)} name={`${level.title} - ${level.progress}/${level.total}`} />
		)
	}

	return (
		<View>
			{display}
			{/* {levels.map((level) => <OneLevel key={level.id} onPress={onPress(level.id)} name={`${level.title} - ${level.progress}/${level.total}`} />)} */}
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
