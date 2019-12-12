import React from 'react';
import {StyleSheet, SafeAreaView, View, Button} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator, NavigationStackOptions} from 'react-navigation-stack';
// import Constants from 'expo-constants';

import Levels, {AddLevel, Feedback} from './levels'
import {Menus} from './menu'
import {colours} from '../utils/constants'
import EditComponent from './edit';

const WrapPageWithMenu = (Page, title: string, options: any = {}) => {
	const Wrapped = ({navigation}) => {
		return (
			<View style={styles.page}>
				<Menus navigation={navigation} />
				<Page navigation={navigation} />
			</View>
		)
	}

	const navigationOptions: NavigationStackOptions = {title, headerLeft: null}
	Wrapped.navigationOptions = navigationOptions

	if (options.noTitle) {
		Wrapped.navigationOptions.headerBackTitle = null
	}

	return Wrapped
}

const RootStack = createStackNavigator({
	show: {screen: WrapPageWithMenu(Levels, 'All levels')},
	add: {screen: WrapPageWithMenu(AddLevel, 'Add a new level')},
	feedback: {screen: WrapPageWithMenu(Feedback, 'Feedback')},
	edit: {
		screen: EditComponent,
		navigationOptions: ({navigation}) => ({
			headerShown: false,
		}),
	}
}, {
	initialRouteName: 'show',
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: colours.fourth,
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
	page: {
		backgroundColor: colours.second,
	},
	container: {
		flex: 1,
		// marginTop: Constants.statusBarHeight,
		// marginHorizontal: 16,

		// backgroundColor: colours.second,
		// alignItems: 'center',
		// justifyContent: 'center',
	},
});
