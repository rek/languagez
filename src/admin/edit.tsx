import React from 'react'
import {StyleSheet, ToastAndroid, TextInput, Text, View, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import {colours} from '../utils/constants'

import {
	NavigationParams,
	NavigationScreenProp,
	NavigationState,
} from 'react-navigation';

import Title from '../common/title'
import {textInput} from '../utils/styles';
import {addItemToLevel} from '../store/levels';
import Upload from '../common/upload'

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
		<View style={styles.container}>
			<Title title={`Editing level ${id}`} />

			<TextInput
				style={textInput}
				onChangeText={updateValue}
				placeholder='Letter name'
				value={value}
			/>

			<Button
				title="Add item"
				onPress={handleAdd}
			/>

			<Title title={`All things in level ${id}`} />

			<View style={{
				flex: 1,
				alignItems: 'flex-start',
				flexDirection: 'column',

			}}>
				{level.items.map((item) => <OneItem key={item.name} name={item.name} />)}
			</View>

		</View>
	)
}

interface OneItemProps {
	name: string,
}
const OneItem: React.SFC<OneItemProps> = ({name}) => {
	return (
		<View style={{
			flex: 1,
			flexDirection: 'row',
			margin: 20,
			padding: 10,
			borderWidth: 1,
			borderColor: '#000'

		}}>
			<Text style={{flex: 3}}>{name}</Text>
			<Upload style={{}}/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colours.second,
	},
})

export default EditComponent
