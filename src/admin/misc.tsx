import React from 'react'
import {useDispatch} from 'react-redux'
import {View} from 'react-native'

import Title from '../common/title'
import {Custom} from '../common/button'

import {resetApp} from '../store'
import {message} from '../utils/message'

interface Props {

}
const Component: React.SFC<Props> = ({}) => {
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
			/>
		</View>
	)
}

export default Component
