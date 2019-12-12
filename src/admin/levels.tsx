import React from 'react';
import {StyleSheet, Text, ToastAndroid, TextInput, View, Button} from 'react-native';
// import Constants from 'expo-constants';
import {Menus} from './menu'
import {useSelector, useDispatch} from 'react-redux'
import {addLevel} from '../store/levels'

export const Feedback = ({navigation}) => {
	return (
		<View>
			<Menus navigation={navigation} />
			<Text>feedback list here</Text>
		</View>
	)
}
Feedback.navigationOptions = {title: 'Feedback', headerLeft: null}

export const AddLevel = ({navigation}) => {
	const [value, updateValue] = React.useState('')

	const dispatch = useDispatch();


	const handleAdd = () => {
		ToastAndroid.show('Level added', ToastAndroid.SHORT);

		dispatch(addLevel(value))
		updateValue('')
	}

	return (
		<View>
			<Menus navigation={navigation} />
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
AddLevel.navigationOptions = {title: 'Add a new level', headerLeft: null, headerBackTitle: null}

// const mapStateToProps = (state) => ({
// 	// todos: getVisibleTodos(state.todos, state.visibilityFilter)
// 	// active: ''
// })

// const mapDispatchToProps = (dispatch: Dispatch) => ({
// 	addLevel: (title: string) => dispatch(addLevel(title))
// })

// export const AddLevel = connect(
// 	mapStateToProps,
// 	mapDispatchToProps
// )(AddLevelBase)


const OneLevel = ({name, handleEdit}) =>
	<View style={{
		flexDirection: 'row',
		justifyContent: 'space-between',
		// alignContent: 'space-between',
	}}>
		<View style={{flex: 1, padding: 10}}>
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
	const handleDelete = (id) => () => {
		console.log('delete', id)
	}

	const levels = useSelector(state => state.LevelReducer.levels)

	// const [levels, setLevels] = React.useState([])

	// React.useEffect(() => {
	// 	setLevels([{
	// 		id: 1,
	// 		name: 'test',
	// 	}])
	// }, [])

	return (
		<View>
			<Menus navigation={navigation} />

			{levels.map((level) => <OneLevel key={level.id} name={`Level ${level.level} - ${level.title}`} handleDelete={handleDelete(level.id)} />)}
		</View>
	)
}

AdminListLevels.navigationOptions = {title: 'All levels', headerLeft: null}

const styles = StyleSheet.create({

})
