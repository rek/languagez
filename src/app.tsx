import React from 'react';

import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import DashboardScreen from './dashboard'
import AdminScreen from './admin'
import FeedbackScreen from './feedback'
import GameScreen from './game'

import {colours} from './utils/constants'

import {Reducer as LevelReducer} from './store/levels'
import {Reducer as FeedbackReducer} from './store/feedback'

const RootStack = createStackNavigator({
  dashboard: {screen: DashboardScreen},
  game: {screen: GameScreen},
  admin: {screen: AdminScreen},
  feedback: {screen: FeedbackScreen},
}, {
  initialRouteName: 'dashboard',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colours.main,
    },
    headerTintColor: colours.third,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

const rootReducer = combineReducers({FeedbackReducer, LevelReducer})
const store = createStore(rootReducer, applyMiddleware(thunk))

const AppContainer = createAppContainer(RootStack);

export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}

// function Separator() {
//   return <View style={styles.separator} />;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   top: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   separator: {
//     marginVertical: 8,
//     borderBottomColor: '#737373',
//     borderBottomWidth: StyleSheet.hairlineWidth,
//   },
//   menus: {
//     flexDirection: 'row',
//   },

// });
