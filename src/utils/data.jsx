import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (value, key = '@default_storage') => {
	try {
		await AsyncStorage.setItem(key, value)
	} catch (e) {
		// saving error
		console.log('e', e)
	}
}

export const getData = async (key = '@default_storage') => {
	try {
		const value = await AsyncStorage.getItem(key)
		if (value !== null) {
			// value previously stored
		}

		return value
	} catch (e) {
		// error reading value
		console.log('e', e)
	}
}
