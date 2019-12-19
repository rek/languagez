import React from 'react'
import {View} from 'react-native';

import Title from '../common/title'
import {getFeedback} from '../store/feedback'

interface Props {

}
const Component: React.SFC<Props> = ({}) => {
	const items = getFeedback()

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
