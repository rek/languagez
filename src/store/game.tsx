const ADD_RESULT = 'ADD_RESULT'

//
// ACTIONS
//

interface AddResult {
	type: typeof ADD_RESULT;
	user: string;
	level: string;
	item: string;
	pass: boolean;
}

export function addResult(user: string, level: string, item: string, pass: boolean): AddResult {
	return {type: ADD_RESULT, user, level, item, pass}
}

//
// TYPES
//

export interface TTest {
	id: number, // object id
	// date: string, // time of attempt
	item: string, // letter id
	pass: boolean, // did they guess it right
}

export interface TUserHistory {
	id: number, // object id
	user: number, // user id
	level: string, // level id
	history: TTest[]
}

export interface State {
	history: TUserHistory[]
}

//
// REDUCER
//

const initialState: State = {
	history: []
}

export const Reducer = (
	state = initialState,
	action: AddResult
) => {

	switch (action.type) {
		// case ADD_FEEDBACK:
		// 	return {
		// 		feedback: [{
		// 			id: state.feedback.length + 1,
		// 			text: action.text,
		// 		}, ...state.feedback]
		// 	};
	}

	return state
}
