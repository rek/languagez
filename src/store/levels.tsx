const ADD_LEVEL = 'ADD_LEVEL'
const ADD_ITEM_TO_LEVEL = 'ADD_ITEM_TO_LEVEL'

export type TLevel = {
	id: number,
	level: number,
	locked: boolean,
	progress: number,
	total: number,
	title: string,
	items: item[],
}

export interface LevelState {
	levels: TLevel[]
}

export function addLevel(title: string): AddAction {
	return {type: ADD_LEVEL, title}
}
export function addItemToLevel(level: number, name: string): AddItemAction {
	return {type: ADD_ITEM_TO_LEVEL, level, name}
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

const initialLevelState: LevelState = {
	levels: [{
		id: 1,
		level: 1,
		locked: false,
		progress: 0,
		total: 100,
		title: 'test',
		items: [{
			name: 'KA',
			image: ''
		}, {
			name: 'BA',
			image: ''
		}, {
			name: 'GA',
			image: ''
		}],
	}]
}

interface AddAction {
	type: typeof ADD_LEVEL;
	title: string;
}
interface AddItemAction {
	type: typeof ADD_ITEM_TO_LEVEL;
	level: number;
	name: string;
}

export const LevelReducer = (
	state = initialLevelState,
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
