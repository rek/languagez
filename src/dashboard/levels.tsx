import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import Button from '../common/button'

import Title from '../common/title'
import {pageStyle} from '../utils/styles';

const OneLevel = ({name, onPress}) =>
	<Button onPress={onPress} style={[pageStyle.default, styles.listItems]}>
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
			{levels.map((level) => <OneLevel key={level.id} onPress={onPress(level.id)} name={`Level ${level.level} - ${level.progress}/${level.total}`} />)}
		</View>
	)
}

const styles = StyleSheet.create({
	listItems: {
		alignItems: 'flex-start',
	}
})

export default ListLevels
