import React from 'react';
import {Text} from 'react-native';

import {Provider} from 'react-redux'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import {PersistGate} from 'redux-persist/integration/react'

import DashboardScreen from './dashboard'
import AdminScreen from './admin'
import FeedbackScreen from './feedback'
import GameScreen from './game'

import User from './admin/user'

import {colours} from './utils/constants'

import {store, persistor} from './store'

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

const AppContainer = createAppContainer(RootStack);

const Loading = () => <Text>LOADING</Text>

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <AppContainer />
        <User />
      </PersistGate>
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
