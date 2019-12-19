import {AppState} from './index';
import {useSelector} from 'react-redux';

import {getLevelItem} from './levels'

const ADD_RESULT = 'ADD_RESULT'

//
// VIEWS
//

export function getUserHistory(user: string) {
	const history = get()

	return history.filter((item) => item.user === user)
}

export function getHistoryForLevel(history, id) {
	return history.filter((item) => {
		return item.id === id
	})
}

export function getUncompleteForLevel(level) {
	const levelHistory = getHistoryForLevel(get(), level.id)

	const hasHistory = (id) => {
		return levelHistory.filter((item) => item.id === id).length > 0
	}

	return level.items.filter((item) => {
		return !hasHistory(item.id)
	})
}

//
export function getQuestionForLevel(level) {
	const itemsToQuestion = getUncompleteForLevel(level)

	if (itemsToQuestion.length > 0) {
		return {
			question: {
				id: itemsToQuestion[0].id,
				text: itemsToQuestion[0].name,
			},
			options: getLevelItem(level, [itemsToQuestion[0].id])
		}

	}

	return false
}

export function getQuestionForItem(item) {

}

export function getProgress(user: string, levels) {
	const history = getUserHistory(user)

	const results = {}

	levels.forEach((level) => {
		const lh = getHistoryForLevel(history, level)
		console.log('level', level.id)
		// console.log('lh', lh)
		let progress = 0
		results[level.id] = {
			id: level.id,
			title: level.title,
			progress: `${progress}/${level.items.length}`,
		}
	})

	return results
}

export function get() {
	return useSelector((state: AppState) => state.GameReducer.history)
}

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
	item: string, // letter id
	pass: boolean, // did they guess it right

	created?: string, // time of attempt
}

export interface TUserHistory {
	id: number, // object id
	user: number, // user id
	level: string, // level id

	state: string, // done?
	progress: number, // percent completed

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
