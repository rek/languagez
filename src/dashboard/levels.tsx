import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';

const OneLevel = ({name}) =>
	<View style={{
	}}>
		<Text>{name}</Text>
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
			{levels.map((level) => <OneLevel key={level.id} name={`Level ${level.level} ${level.progress}/${level.total}`} />)}
		</View>
	)
}
