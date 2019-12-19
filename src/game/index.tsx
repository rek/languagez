import React from 'react'
import {useDispatch} from 'react-redux'
import {StyleSheet, View, Text} from 'react-native';

import {useUser} from '../store/user'
import {getLevel} from '../store/levels'
import {addResult, getQuestionForLevel} from '../store/game'

import {pageStyle} from '../utils/styles'
import Image from '../common/image'
import Title from '../common/title'
import {Clickable as CustomButton} from '../common/button'

import {tickImage, crossImage} from '../store/fixtures/misc'

function GameModule({navigation}) {
	const id = navigation.state.params.id
	// console.log('id', id)
	const level = getLevel(id)
	// console.log('level', level)

	const [questionSet, setSetId] = React.useState(0)

	const itemsToQuestion = getQuestionForLevel(level)
	// console.log('itemsToQuestion', itemsToQuestion)

	const handleDone = () => {
		// console.log('outa here!')
		// navigation.navigate('game', {id})
		setSetId(questionSet + 1)
	}

	return (
		<Game id={id} key={questionSet} itemsToQuestion={itemsToQuestion} handleDone={handleDone} />
	)
}

GameModule.navigationOptions = {title: 'Game'}

const Game: React.SFC<{itemsToQuestion: any, id: number, handleDone: any}> = ({
	id,
	itemsToQuestion,
	handleDone
}) => {
	const [attempts, addAttempt] = React.useState([])
	const dispatch = useDispatch()
	const [user] = useUser()

	if (!itemsToQuestion) {
		return (
			<View style={pageStyle.default}>
				<Title title='Level done' />
			</View>
		)
	}

	const handleSelect = (item) => {
		if (item.correct) {
			setTimeout(() => {
				dispatch(addResult({user, level: id, item: item.id, attempts}))
				handleDone()
			}, 1000)
		} else {
			addAttempt([...attempts, item.id])
		}
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
			onPress={handleClick}
		>
			<Image base64={item.image} style={styles.image} />
		</CustomButton>
	)
}

const Options = ({options, handleSelect}) => {
	return (
		<View style={styles.optionBox}>
			{options.map((item) => <Option key={item.id} item={item} handleSelect={handleSelect} />)}
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
