import React from 'react'
import {View} from 'react-native';
import {useSelector} from 'react-redux'

import Title from '../common/title'

interface Props {

}
const Component: React.SFC<Props> = ({}) => {
	const items = useSelector(state => state.FeedbackReducer.feedback)

	if (items.length === 0) {

		return (
			<View>
				<Title title={'No feedback yet.'} />
			</View>
		)
	}

	return (
		<View>
			{items.map((item, index) => <Title key={index} title={item.text} />)}
		</View>
	)
}

export default Component
