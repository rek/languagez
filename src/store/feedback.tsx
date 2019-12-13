const ADD_FEEDBACK = 'ADD_FEEDBACK'

//
// ACTIONS
//

interface AddAction {
	type: typeof ADD_FEEDBACK;
	text: string;
}

export function addLevel(text: string): AddAction {
	return {type: ADD_FEEDBACK, text}
}

//
// TYPES
//

export interface TItem {
	id: number,
	text: string,
}

export interface State {
	feedback: TItem[]
}

const initialState: State = {
	feedback: []
}

export const Reducer = (
	state = initialState,
	action: AddAction
) => {

	switch (action.type) {
		case ADD_FEEDBACK:
			return {
				feedback: [{
					id: state.feedback.length + 1,
					text: action.text,
				}, ...state.feedback]
			};
	}

	return state
}
