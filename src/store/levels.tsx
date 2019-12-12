const ADD_LEVEL = 'ADD_LEVEL'

export type TLevel = {
	id: number,
	level: number,
	locked: boolean,
	progress: number,
	total: number,
	title: string,
}

export interface LevelState {
	levels: TLevel[]
}

export function addLevel(title: string) {
	return {type: ADD_LEVEL, title}
}

const levelDefaults = {
	level: 1,
	locked: false,
	progress: 0,
	total: 100,
}

const initialLevelState: LevelState = {
	levels: [{
		id: 1,
		level: 1,
		locked: false,
		progress: 0,
		total: 100,
		title: 'test',
	}]
}

interface AddAction {
	type: typeof ADD_LEVEL;
	title: string;
}

export const LevelReducer = (
	state = initialLevelState,
	action: AddAction
) => {

	switch (action.type) {
		case ADD_LEVEL:
			return {
				levels: [{
					...levelDefaults,
					id: state.levels.length + 1,
					title: action.title,
				}, ...state.levels]
			}
	}

	return state
}
