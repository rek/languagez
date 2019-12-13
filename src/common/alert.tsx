import {Alert} from "react-native";

interface Props {
	title?: string,
	message?: string,
	yes?: string,
	no?: string,
	yesAction: () => void,
}

function AlertComponent({
	title = '',
	message = '',
	yes = 'OK',
	no = 'Cancel',
	yesAction,
}: Props) {
	Alert.alert(
		title,
		message,
		[
			{
				text: no,
				// onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{text: yes, onPress: () => yesAction()},
		],
		{cancelable: false},
	)
}

export default AlertComponent