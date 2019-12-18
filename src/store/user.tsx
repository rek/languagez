
const ADD_USER = 'ADD_USER'

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
