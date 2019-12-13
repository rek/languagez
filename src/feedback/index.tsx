import React from 'react';
import {ToastAndroid, View, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux'

import {addFeedback} from '../store/feedback';
import Textarea from '../common/textarea'
import {pageStyle} from '../utils/styles'
import {Simple} from '../common/button'

export const Feedback = ({navigation}) => {
	const [value, onChangeText] = React.useState('We would love to have your feedback, please type below:');

	const dispatch = useDispatch();

	const handleSend = () => {
		ToastAndroid.showWithGravity('', ToastAndroid.SHORT, ToastAndroid.CENTER);

		dispatch(addFeedback(value))
		onChangeText('')
		Keyboard.dismiss()
	}

	return (
		<View style={pageStyle.default}>
			<Textarea
				onChangeText={onChangeText}
				value={value}
			/>
			<Simple
				title="Send"
				onPress={handleSend}
			/>
		</View>
	)
}
Feedback.navigationOptions = {title: 'Feedback'}

export default Feedback
