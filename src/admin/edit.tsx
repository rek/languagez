import React from 'react'
import {ToastAndroid, TextInput, Text, View, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'

import {
	NavigationParams,
	NavigationScreenProp,
	NavigationState,
} from 'react-navigation';

import Title from '../common/title'
import styles from '../utils/styles';
import {addItemToLevel} from '../store/levels';

interface Props {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const EditComponent: React.SFC<Props> = ({navigation}) => {
	const [value, updateValue] = React.useState('')

	const id = navigation.state.params.id

	const dispatch = useDispatch();

	const handleAdd = () => {
		ToastAndroid.showWithGravity('Item added', ToastAndroid.SHORT, ToastAndroid.CENTER);
		dispatch(addItemToLevel(id, value))
		updateValue('')
	}

	const levels = useSelector(state => state.LevelReducer.levels)
	const level = levels.find((item) => item.id === id)

	if (!level) {
		return (
			<View>
				<Text>Error. Level not found</Text>
			</View>
		)
	}

	return (
		<View>
			<Title title={`Editing level ${id}`} />

			<TextInput
				style={styles.textInput}
				onChangeText={updateValue}
				placeholder='Letter name'
				value={value}
			/>
			<Button
				title="Add item"
				onPress={handleAdd}
			/>

			<Title title={`All things in level ${id}`} />

			{level.items.map((item) => <OneItem key={item.name} name={item.name} />)}

		</View>
	)
}

interface OneItemProps {
	name: string,
}
const OneItem: React.SFC<OneItemProps> = ({name}) => {
	return (
		<Text>{name}</Text>
	)
}


export default EditComponent
