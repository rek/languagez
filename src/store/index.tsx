import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import {AsyncStorage} from 'react-native';
import thunk from 'redux-thunk'

import {persistStore, persistReducer} from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import {Reducer as LevelReducer} from './levels'
import {Reducer as FeedbackReducer} from './feedback'
import {Reducer as GameReducer} from './game'
import {Reducer as UserReducer} from './user'

export const RESET_APP = 'RESET_APP'
export const resetApp = () => {
	return {type: RESET_APP}
}

const persistConfig = {
	key: 'root',
	// storage,
	storage: AsyncStorage,
	stateReconciler: hardSet,
}

const reducer = combineReducers({FeedbackReducer, LevelReducer, GameReducer, UserReducer})

const rootReducer = (state, action) => {
	// when a logout action is dispatched it will reset redux state
	if (action.type === RESET_APP) {
		state = undefined;
	}

	return reducer(state, action);
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
)
const store = createStore(persistedReducer, enhancer);

// const store = createStore(
// 	persistedReducer,
// 	applyMiddleware(thunk),
// )

let persistor = persistStore(store)

type AppState = ReturnType<typeof reducer>

export {
	store,
	persistor,
	AppState
}
