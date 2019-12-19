import React from 'react'
import {useDispatch} from 'react-redux'
import {StyleSheet, View, Text} from 'react-native';

import {useUser} from '../store/user'
import {getLevel} from '../store/levels'
import {addResult, getQuestionForLevel} from '../store/game'

import {pageStyle} from '../utils/styles'
import Image from '../common/image'
import {Clickable as CustomButton} from '../common/button'

import {tickImage, crossImage} from '../store/fixtures/misc'

function GameModule({navigation}) {
	const id = navigation.state.params.id
	// console.log('id', id)
	const level = getLevel(id)
	// console.log('level', level)
	const [user] = useUser()
	const dispatch = useDispatch()
	const itemsToQuestion = getQuestionForLevel(level)
	// console.log('itemsToQuestion', itemsToQuestion)

	if (!itemsToQuestion) {
		return () =>
			<Text>Level done</Text>
	}

	const handleSelect = (item) => {
		dispatch(addResult(user, id, item.id, item.correct || false))
	}

	return (
		<View style={pageStyle.default}>
			{/* <Text>Game id: {id}</Text> */}

			<View style={styles.questionBox}>
				<Text style={styles.questionText}>{itemsToQuestion.question.text}</Text>
			</View>

			<Options
				handleSelect={handleSelect}
				options={itemsToQuestion.options}
			/>
		</View>
	)
}

GameModule.navigationOptions = {title: 'Game'}

const Option = ({item, handleSelect}) => {
	const [passed, setPassed] = React.useState()

	const handleClick = () => {
		handleSelect(item)
		setPassed(item.correct || false)
	}

	if (passed !== undefined) {
		return (
			<Image base64={passed ? tickImage : crossImage} style={styles.image} />
		)
	}

	return (
		<CustomButton
			key={item.id}
			onPress={handleClick}
		>
			<Image base64={item.image} style={styles.image} />
		</CustomButton>
	)
}

const Options = ({options, handleSelect}) => {
	return (
		<View style={styles.optionBox}>
			{options.map((item) => <Option item={item} handleSelect={handleSelect} />)}
		</View>
	)
}

const styles = StyleSheet.create({
	questionBox: {
		marginBottom: 20,
		alignSelf: 'center'
	},
	questionText: {
		fontSize: 100
	},
	optionBox: {
		flex: 1,
		flexDirection: 'row',
	},
	image: {
		width: 100,
		height: 100,
		margin: 8
	}
})

export default GameModule
