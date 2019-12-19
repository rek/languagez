import React from 'react';
import {StyleSheet, Text, TextInput, View, Keyboard} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'

import {addLevel} from '../store/levels'

import {textInput} from '../utils/styles';
import {message} from '../utils/message';
import {colours} from '../utils/constants'
import {Simple, Custom} from '../common/button'

export const AddLevel = ({navigation}) => {
	const [value, updateValue] = React.useState('')

	const dispatch = useDispatch();

	const handleAdd = () => {
		if (value === '') {
			message('Please enter in a level name')
			return
		}

		message('Level added')

		dispatch(addLevel(value))
		updateValue('')
		Keyboard.dismiss()
		navigation.navigate('show')
	}

	return (
		<View>
			<TextInput
				style={textInput}
				onChangeText={updateValue}
				placeholder='Level name'
				value={value}
			/>

			<Simple
				title="Add level"
				onPress={handleAdd}
				styles={{width: 150, margin: 10}}
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
			<Custom
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
		<View style={styles.container}>
			{levels.map((level) => <OneLevel key={level.id} name={`${level.title}`} handleEdit={handleEdit(level.id)} />)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colours.second,
	}
})
