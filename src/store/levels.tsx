import {AppState} from './index';
import {useSelector} from 'react-redux';

import level1 from './fixtures/level1'

const ADD_LEVEL = 'ADD_LEVEL'
const DELETE_LEVEL = 'DELETE_LEVEL'

const LEVEL_ITEM_DELETE = 'LEVEL_ITEM_DELETE'
const LEVEL_ITEM_ADD = 'LEVEL_ITEM_ADD'
const LEVEL_ITEM_EDIT = 'LEVEL_ITEM_EDIT'

//
// VIEWS
//

export function get() {
	return useSelector((state: AppState) => state.LevelReducer.levels)
}

export function getLevel(id: number) {
	return get().find((level) => level.id === id)
}

const isInList = (list, id) => {
	return list.filter((item) => item.id === id).length > 0
}

export function getLevelItem(level, exclusions = [], results = [], amount = 3) {
	if (results.length === amount) {
		return results
	}

	// get an item not in the list and not excluded already
	const found = level.items.find((item) => {
		if (!exclusions.includes(item.id)) {
			if (!isInList(results, item.id)) {
				return true
			}
		}
	})

	if (found) {
		results.push(found)
		return getLevelItem(level, exclusions, results, amount)
	}

	return results
}

//
// ACTIONS
//

interface AddAction {
	type: typeof ADD_LEVEL;
	title: string;
}
export function addLevel(title: string): AddAction {
	return {type: ADD_LEVEL, title}
}

interface AddItemAction {
	type: typeof LEVEL_ITEM_ADD;
	level: number;
	name: string;
}
export function addItemToLevel(level: number, name: string): AddItemAction {
	return {type: LEVEL_ITEM_ADD, level, name}
}

interface ActionItemEdit {
	type: typeof LEVEL_ITEM_EDIT;
	level: number;
	itemId: string;
	name: string;
}
export function levelItemEdit({level, itemId, name}: Partial<ActionItemEdit>): ActionItemEdit {
	return {type: LEVEL_ITEM_EDIT, level, itemId, name}
}

interface ActionItemDelete {
	type: typeof LEVEL_ITEM_DELETE;
	level: number;
	item: string;
}
export function levelItemDelete(level: number, item: string): ActionItemDelete {
	return {type: LEVEL_ITEM_DELETE, level, item}
}

//
// TYPES
//

export type TLevel = {
	id: number,
	// level: number,
	locked: boolean,
	progress: number,
	total: number,
	created: string,
	title: string,
	items: TItem[],
}

export interface State {
	levels: TLevel[]
}

export interface TItem {
	id: string,
	name: string,
	image?: string,
}

const levelDefaults = {
	// level: 1,
	locked: false,
	created: new Date(),
	progress: 0,
	total: 100,
	items: [],
}

const initialState: State = {
	levels: [level1]
}

export const Reducer = (
	state = initialState,
	action: AddAction | AddItemAction | ActionItemDelete | ActionItemEdit
) => {

	switch (action.type) {
		case ADD_LEVEL:
			return {
				levels: [{
					...levelDefaults,
					id: state.levels.length + 1,
					title: action.title,
				}, ...state.levels]
			};

		case LEVEL_ITEM_DELETE:
			return {
				levels: state.levels.map((level) => {
					return level.id === action.level
					? {
						...level,
						items: level.items.filter((item) => item.name !== action.item)
					}
					: level
				})
			}

		case LEVEL_ITEM_EDIT:
			return {
				levels: state.levels.map((level) => {
					return level.id === action.level
						? {
							...level,
							items: level.items.map((item) => {
								if (item.id === action.itemId) {
									return {
										...item,
										name: action.name,
									}
								} else {
									return item
								}
							})
						}
						: level
				})
			}

		case LEVEL_ITEM_ADD:
			return {
				levels: state.levels.map((level) => {
					return level.id === action.level
						? {
							...level,
							items: [
								{
									name: action.name
								},
								...level.items,
							]
						}
						: level
				})
			}
	}

	return state
}
