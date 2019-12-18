import React from 'react'
import {Text, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux'

import {addUser} from '../store/user'

// import {getData} from '../utils/data'
import uuid from 'uuid/v4'

interface Props {

}

const Component: React.SFC<Props> = ({}) => {
	// const user = getData()
	let user = useSelector(state => {
		// console.log('state', state)
		return state.UserReducer.user
	})

	const dispatch = useDispatch()

	if (!user) {
		console.log('no user, creating!')
		dispatch(addUser(uuid()))
	}

	return (
		<Text>
			User: {user}
		</Text>
	)
}

export default Component
