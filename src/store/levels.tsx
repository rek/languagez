const ADD_LEVEL = 'ADD_LEVEL'
const ADD_ITEM_TO_LEVEL = 'ADD_ITEM_TO_LEVEL'

//
// ACTIONS
//
interface AddAction {
	type: typeof ADD_LEVEL;
	title: string;
}
interface AddItemAction {
	type: typeof ADD_ITEM_TO_LEVEL;
	level: number;
	name: string;
}

export function addLevel(title: string): AddAction {
	return {type: ADD_LEVEL, title}
}
export function addItemToLevel(level: number, name: string): AddItemAction {
	return {type: ADD_ITEM_TO_LEVEL, level, name}
}

//
// TYPES
//

export type TLevel = {
	id: number,
	level: number,
	locked: boolean,
	progress: number,
	total: number,
	title: string,
	items: item[],
}

export interface State {
	levels: TLevel[]
}

export interface item {
	name: string,
	image?: string,
}

const levelDefaults = {
	level: 1,
	locked: false,
	progress: 0,
	total: 100,
	items: [],
}

const initialState: State = {
	levels: [{
		id: 1,
		level: 1,
		locked: false,
		progress: 0,
		total: 100,
		title: 'Level 1',
		items: [{
			name: 'ཀ',
			image: ''
		}, {
			name: 'ཀར',
			image: ''
		}, {
			name: 'ཀུ་',
			image: ''
		}],
	}]
}

export const Reducer = (
	state = initialState,
	action: AddAction | AddItemAction
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

		case ADD_ITEM_TO_LEVEL:
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
