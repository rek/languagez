import React from 'react';
import {StyleSheet, Text, ToastAndroid, TextInput, View, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import {addLevel} from '../store/levels'
import Title from '../common/title'

export const Feedback = () => {
	return (
		<View>
			<Title title='Feedback list goes here...' />
		</View>
	)
}

export const AddLevel = () => {
	const [value, updateValue] = React.useState('')

	const dispatch = useDispatch();

	const handleAdd = () => {
		ToastAndroid.show('Level added', ToastAndroid.SHORT);

		dispatch(addLevel(value))
		updateValue('')
	}

	return (
		<View>
			<TextInput
				style={{height: 40, borderColor: 'gray', borderWidth: 1}}
				onChangeText={updateValue}
				placeholder='Level name'
				value={value}
			/>
			<Button
				title="Add level"
				onPress={handleAdd}
			/>
		</View>
	)
}

const OneLevel = ({name, handleEdit}) =>
	<View style={{
		flexDirection: 'row',
		justifyContent: 'space-between',
	}}>
		<View style={{flex: 1, padding: 10}}>
			{/* <Title title={name} /> */}
			<Text>{name}</Text>
		</View>
		<View style={{flex: 1}}>
			<Button
				title="Edit"
				onPress={handleEdit}
			/>
		</View>
	</View>

export default function AdminListLevels({navigation}) {
	const handleEdit = (id: number) => () => {
		navigation.navigate('edit', {id})
	}

	const levels = useSelector(state => state.LevelReducer.levels)

	return (
		<View>
			{levels.map((level) => <OneLevel key={level.id} name={`Level ${level.level} - ${level.title}`} handleEdit={handleEdit(level.id)} />)}
		</View>
	)
}

const styles = StyleSheet.create({

})
