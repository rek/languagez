import {ToastAndroid} from 'react-native'

export const message = (text: string) => {
	ToastAndroid.showWithGravity(text, ToastAndroid.SHORT, ToastAndroid.CENTER);
}
