import React from 'react';
import {ToastAndroid, View, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux'

import {addFeedback} from '../store/feedback';
import Textarea from '../common/textarea'
import Title from '../common/title'
import {pageStyle} from '../utils/styles'
import {Custom} from '../common/button'
import {message} from '../utils/message'

export const Feedback = ({navigation}) => {
	const [value, onChangeText] = React.useState<string>('');

	const dispatch = useDispatch();

	const handleSend = () => {
		message('Thanks, feedback submitted!');

		dispatch(addFeedback(value))
		onChangeText('')
		Keyboard.dismiss()

		navigation.navigate('dashboard')
	}

	return (
		<View style={pageStyle.default}>
			<Title title='We would love to have your feedback, please type below:'/>

			<Textarea
				onChangeText={onChangeText}
				value={value}
			/>
			<Custom
				title="Send"
				onPress={handleSend}
				extras={{margin: 10}}
			/>
		</View>
	)
}
Feedback.navigationOptions = {title: 'Feedback'}

export default Feedback
