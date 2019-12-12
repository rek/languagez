import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';

import Title from '../common/title'

const OneLevel = ({name}) =>
	<View style={{
	}}>
		<Title title={name} />
	</View>

export default function ListLevels({}) {
	const levels = useSelector(state => state.LevelReducer.levels)
	console.log('levels', levels)
	// const [levels] = React.useState(useSelector(state => state.levels))

	// React.useEffect(() => {
	// 	setLevels(useSelector(state => state.levels))
	// }, [])

	return (
		<View>
			{levels.map((level) => <OneLevel key={level.id} name={`Level ${level.level} - ${level.progress}/${level.total}`} />)}
		</View>
	)
}
