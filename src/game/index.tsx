import React from 'react'
import {StyleSheet, Image, View, Text} from 'react-native';

import {getLevel} from '../store/levels'
import {get as getHistory, getQuestionForLevel} from '../store/game'
import {pageStyle} from '../utils/styles'
import {Clickable as CustomButton} from '../common/button'

function GameModule({navigation}) {
	const id = navigation.state.params.id
	console.log('id', id)
	const level = getLevel(id)
	// const history = getHistory()

	// console.log('level', level)
	// console.log('history', history)

	const itemsToQuestion = getQuestionForLevel(level)

	console.log('itemsToQuestion', itemsToQuestion)

	if (!itemsToQuestion) {
		return () =>
			<Text>Level done</Text>
	}

	const handleSelect = (id) => () => {
		console.log('111', id)
	}

	return (
		<View style={pageStyle.default}>
			{/* <Text>Game id: {id}</Text> */}

			<View style={styles.questionBox}>
				<Text style={styles.questionText}>{itemsToQuestion.question.text}</Text>
			</View>

			<Options
				options={itemsToQuestion.options}
				handleSelect={handleSelect}
			/>
		</View>
	)
}

GameModule.navigationOptions = {title: 'Game'}

const Options = ({options, handleSelect}) => {
	return (
		<View style={styles.optionBox}>
			{options.map((item) =>
				<CustomButton
					key={item.id}
					onPress={handleSelect(item.id)}
				>
					<Image source={{uri: `data:image/jpeg;base64,${item.image}`}} style={styles.image} />
				</CustomButton>
			)}
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
