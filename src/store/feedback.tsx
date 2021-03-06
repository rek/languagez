import {AppState} from './index';
import {useSelector} from 'react-redux'

const ADD_FEEDBACK = 'ADD_FEEDBACK'

//
// VIEWS
//

export function getFeedback() {
	return useSelector((state: AppState) => state.FeedbackReducer.feedback)
}

//
// ACTIONS
//

interface AddAction {
	type: typeof ADD_FEEDBACK;
	text: string;
}

export function addFeedback(text: string): AddAction {
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

//
// REDUCER
//

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
