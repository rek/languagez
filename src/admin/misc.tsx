import React from 'react'
import {useDispatch} from 'react-redux'
import {View, Text} from 'react-native'

import Title from '../common/title'
import {Custom} from '../common/button'

import {resetApp} from '../store'
import {get as getHistory} from '../store/game'
import {message} from '../utils/message'

interface Props {

}
const MiscComponent: React.SFC<Props> = ({}) => {
	const dispatch = useDispatch()

	const handleReset = () => {
		dispatch(resetApp())
		message('App reset complete!')
	}

	return (
		<View>
			<Title title='Internal admin options' />
			<Custom
				title='Reset localstorage'
				onPress={handleReset}
				extras={{width: 200, margin: 10}}
			/>

			<Title title='Stats' />

			{getHistory().map((item) => {
				return (
					<View key={item.id}>
						<Text>Level: {item.level}</Text>

						{item.history.map((historyItem) => {
							return (
								<Text>{historyItem.item} - {historyItem.pass}</Text>
							)
						})}
					</View>
				)
			})}
		</View>
	)
}

export default MiscComponent
