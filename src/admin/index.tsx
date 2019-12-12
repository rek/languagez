import React from 'react';
import {StyleSheet, SafeAreaView, View, Button} from 'react-native';
import Constants from 'expo-constants';
import Levels, {AddLevel, Feedback} from './levels'
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {colours} from '../utils/constants'

const RootStack = createStackNavigator({
	show: {screen: Levels},
	add: {screen: AddLevel},
	feedback: {screen: Feedback},
}, {
	initialRouteName: 'show',
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: colours.highlight,
		},
		headerTintColor: colours.third,
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	},

})

const AppContainer = createAppContainer(RootStack);

export default function AdminModule() {
	return (
		<SafeAreaView style={styles.container}>
			<AppContainer />
		</SafeAreaView>
	);
}

AdminModule.navigationOptions = {title: 'Admin'}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: Constants.statusBarHeight,
		// marginHorizontal: 16,

		backgroundColor: colours.second,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
});
