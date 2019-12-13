import React from 'react'
import {StyleSheet, ToastAndroid, TextInput, Text, FlatList, View, Button, Keyboard} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import {colours} from '../utils/constants'

import {
	NavigationParams,
	NavigationScreenProp,
	NavigationState,
} from 'react-navigation';

import Title from '../common/title'
import {textInput} from '../utils/styles';
import {addItemToLevel, levelItemEdit, levelItemDelete, TItem} from '../store/levels';
import Upload from '../common/upload'
import {Simple} from '../common/button'
import AlertDelete from '../common/alertDelete'

interface Props {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const EditComponent: React.SFC<Props> = ({navigation}) => {
	const [value, updateValue] = React.useState('')

	const id = navigation.state.params.id

	const dispatch = useDispatch();

	const handleDelete = (name) => () => {
		AlertDelete({
			deleteAction: () => {
				dispatch(levelItemDelete(id, name))
			}
		})
	}

	const handleAdd = () => {
		ToastAndroid.showWithGravity('Item added', ToastAndroid.SHORT, ToastAndroid.CENTER);
		dispatch(addItemToLevel(id, value))
		updateValue('')
		Keyboard.dismiss()
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

			<View style={{
				width: 100,
				marginLeft: 10,
				marginBottom: 50,
			}}>
				<Button
					title="Add item"
					onPress={handleAdd}
				/>
			</View>

			<Title title={`All things in level ${id}`} />

			<View style={{
				// flex: 1,
				// alignItems: 'flex-start',
				// flexDirection: 'column',
			}}>

				<FlatList
					data={level.items}
					renderItem={({item}) => {
						const {name} = item as TItem
						return (
							<OneItem
								name={name}
								handleDelete={handleDelete(name)}
							/>
						)
					}}
					keyExtractor={item => item.name}
				/>

				{/* {level.items.map((item) => <OneItem key={item.name} name={item.name} />)} */}
			</View>

		</View>
	)
}

const EditItem = ({name, handleEdit}) => {
	console.log('handleEdit', handleEdit)

	return (
		<Text>Edit: {name}</Text>
	)
}

interface OneItemProps {
	name: string,
	handleDelete: () => void,
}
const OneItem: React.SFC<OneItemProps> = ({name, handleDelete}) => {
	// const dispatch = useDispatch();
	console.log('{name, handleDelete}', {name, handleDelete})

	const [editMode, setMode] = React.useState(false)

	const handleEdit = () => {

		setMode(true)

		// Alert({
		// 	title: 'Are you sure you want to delete?',
		// 	message: '',
		// 	yesAction: deleteAction,
		// })
	}

	if (editMode) {
		const handleEdit = () => {
			setMode(false)
		}

		return (
			<EditItem
				name={name}
				handleEdit={handleEdit}
			/>
		)
	}

	return (
		<View style={{
			flex: 1,
			width: 300,
			flexDirection: 'row',
			margin: 10,
			padding: 10,
			borderWidth: 1,
			borderColor: '#000'

		}}>
			<Text style={{flex: 3}}>{name}</Text>

			<Upload
				renderUploadButton={({onPress}) => {
					return (
						<Simple
							title="Upload"
							onPress={onPress}
						/>
					)
				}}
			/>
			<Simple
				title="Edit"
				onPress={handleEdit}
			/>
			<Simple
				title="Delete"
				onPress={handleDelete}
			/>
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
