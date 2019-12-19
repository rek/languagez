import {AppState} from './index';
import {useSelector} from 'react-redux';

const ADD_USER = 'ADD_USER'

//
// VIEWS
//

export function useUser() {
	const userId = useSelector((state: AppState) => state.UserReducer.user)

	return [userId]
}

interface AddUser {
	type: typeof ADD_USER;
	user: string;
}

export function addUser(user): AddUser {
	return {type: ADD_USER, user}
}

export interface State {
	user: string
}

const initialState: State = {
	user: ''
}

//
// REDUCER
//

export const Reducer = (
	state = initialState,
	action: AddUser
) => {

	switch (action.type) {
		case ADD_USER:
			return {
				user: action.user
			}
	}

	return state
}
