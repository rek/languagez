import {AppState} from './index';
import {useSelector} from 'react-redux';
import uuid from 'uuid/v4'

import {getOptionsForItem} from './levels'

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
		const current = itemsToQuestion[0]
		const options = getOptionsForItem(level, [current.id], [{correct: true, ...current}])

		return {
			question: {
				id: current.id,
				text: current.name,
			},
			options,
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
		// console.log('level', level.id)
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
	return useSelector((state: AppState) => state.GameReducer.history) as TUserHistory[]
}

//
// ACTIONS
//

interface AddResult {
	type: typeof ADD_RESULT;
	user: string;
	level: number;
	item: string;
	pass: boolean;
}

export function addResult({user, level, item, pass}: AddResult): AddResult {
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
	user: string, // user id
	level: number, // level id

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

interface HistorySearch {
	history: TUserHistory[], level: number, user: string
}
const hasHistoryItem = (history: TUserHistory[], level: number, user: string) => {
	return history.find((item) => item.level === level && item.user === user)
}

const ensureHistoryItem = (history, level, user) => {
	const existing = hasHistoryItem(history, level, user)

	if (existing) {
		return history
	}

	return [...history, {
		id: uuid(),
		user,
		level,

		state: '',
		progress: 0,
		history: []
	}]
}

export const Reducer = (
	state = initialState,
	action: AddResult
) => {

	switch (action.type) {
		case ADD_RESULT:
			const workingHistory = ensureHistoryItem(state.history, action.level, action.user)

			return {
				history: workingHistory.map((item) => {
					return item.level === action.level && item.user === action.user
						? {
							...item,
							history: [...item.history, {
								id: uuid(),
								item: action.item,
								pass: action.pass,

								created: ''
							}]
						} : item
				})
			};
	}

	return state
}
