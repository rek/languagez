import React from 'react'
import {StyleSheet, TextInput, Text, FlatList, View, Keyboard} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'
import Modal from "react-native-modal";
import {
	NavigationParams,
	NavigationScreenProp,
	NavigationState,
} from 'react-navigation';

import {colours} from '../utils/constants'
import {message} from '../utils/message'
import Title from '../common/title'
import Image from '../common/image'
import {textInput, modalStyle} from '../utils/styles';
import {addItemToLevel, levelItemEdit, levelItemDelete, TItem} from '../store/levels';
import Upload from '../common/upload'
import {Simple, ShortButton} from '../common/button'
import AlertDelete from '../common/alertDelete'

const AddItem = ({id, closeModal}) => {
	const dispatch = useDispatch();
	const [value, updateValue] = React.useState('')

	const handleAdd = () => {
		message('Item added');
		dispatch(addItemToLevel(id, value))
		updateValue('')
		Keyboard.dismiss()
		closeModal()
	}

	return (
		<View style={modalStyle.middle}>
			<Title title='New Item' />

			<TextInput
				style={textInput}
				onChangeText={updateValue}
				placeholder='Name'
				value={value}
			/>

			<View style={{
				width: 100,
				marginLeft: 10,
				marginBottom: 50,
			}}>
				<Simple
					title="Add"
					onPress={handleAdd}
				/>
			</View>
		</View>
	)
}

interface Props {
	navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const EditComponent: React.SFC<Props> = ({navigation}) => {
	const id = navigation.state.params.id
	const [visible, showModal] = React.useState(false)
	const [visibleEdit, showModalEdit] = React.useState<string | boolean>(false)

	const dispatch = useDispatch();

	const handleEdit = (name) => {
		closeModalEdit()
		const itemId = visibleEdit as string
		// console.log('handle edit', {itemId, name})
		dispatch(levelItemEdit({level: id, itemId, name}))
	}

	const closeModal = () => showModal(false)
	const closeModalEdit = () => showModalEdit(false)

	const openEditModal = (id) => {
		showModalEdit(id)
	}

	const handleAdd = (id) => {
		showModal(true)
	}

	const handleDelete = (name) => () => {
		AlertDelete({
			deleteAction: () => {
				dispatch(levelItemDelete(id, name))
			}
		})
	}

	const levels = useSelector(state => state.LevelReducer.levels)
	const level = levels.find((item) => item.id === id)
	const getItem = (id) => {
		const result = level.items.find((item) => item.id === id)
		return result ? result.name : ''
	}

	if (!level) {
		return (
			<View>
				<Text>Error. Level not found</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<View style={{
				alignItems: 'flex-start',
				flexDirection: 'row',
			}}>
				<Title title={`Editing level ${id}`} />
				<Simple
					title="Add Item"
					onPress={handleAdd}
					styles={{margin: 10}}
				/>
			</View>

			<Modal isVisible={visible} onBackdropPress={closeModal}>
				<AddItem id={id} closeModal={closeModal} />
			</Modal>

			<Modal isVisible={visibleEdit !== false} onBackdropPress={closeModalEdit}>
				<EditItem
					name={getItem(visibleEdit)}
					handleEdit={handleEdit}
				/>
			</Modal>

			<View style={{
				// flex: 1,
				// alignItems: 'flex-start',
				// flexDirection: 'column',
			}}>
				<FlatList
					style={{
					}}
					data={level.items}
					renderItem={({item}) => {
						// console.log('item', item)
						const {name, id, image} = item as TItem

						return (
							<OneItem
								name={name}
								image={image}
								handleDelete={handleDelete(name)}
								handleEdit={() => openEditModal(id)}
								// handleEdit={handleEdit(id)}
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
	const [newTitle, setTitle] = React.useState(name)

	const doEdit = () => {
		Keyboard.dismiss()
		handleEdit(newTitle)
	}

	return (
		<View style={modalStyle.middle}>
			<TextInput
				style={textInput}
				onChangeText={setTitle}
				value={newTitle}
			/>
			<ShortButton
				title='Save'
				onPress={doEdit}
			/>
		</View>
	)
}

interface OneItemProps {
	name: string,
	image?: string,
	handleDelete: () => void,
	handleEdit: (newName: string) => void,
}
const OneItem: React.SFC<OneItemProps> = ({name, image, handleDelete, handleEdit}) => {
	// const dispatch = useDispatch();
	// console.log('{name, handleDelete}', {name, handleDelete})

	// const [editMode, setMode] = React.useState(false)

	// const startEdit = () => {
	// 	setMode(true)

	// 	// Alert({
	// 	// 	title: 'Are you sure you want to delete?',
	// 	// 	message: '',
	// 	// 	yesAction: deleteAction,
	// 	// })
	// }

	// if (editMode) {
	// 	const doEdit = (newName) => {
	// 		setMode(false)
	// 		handleEdit(newName)
	// 	}

	// 	return (
	// 		<EditItem
	// 			name={name}
	// 			handleEdit={doEdit}
	// 		/>
	// 	)
	// }

	const handleUpload = (image) => {
		console.log('image', image)
	}

	const ImageOrUpload = ({image}) => {
		if (image) {
			return (
				<Image base64={image} />
			)
		}

		return (
			<Upload
				handleUpload={handleUpload}
				renderUploadButton={({onPress}) => {
					return (
						<Simple
							title="Upload"
							onPress={onPress}
						/>
					)
				}}
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

			<ImageOrUpload image={image} />

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
