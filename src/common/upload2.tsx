import React from 'react';
import {
	// Text,
	View,
	// Dimensions,
	ActivityIndicator,
	Platform,
	Alert,
	Linking,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native';
import {ImagePicker, Permissions} from 'expo';
// import uid from 'uuid/v4';

interface Props {
	callbackUrl?: string
}

const Component: React.SFC<Props> = ({
	callbackUrl,
}) => {

	const [loading, setLoading] = React.useState(false)
	const [uploadedImage, setImage] = React.useState()

	// this.state = {
	// 	endpoint: this.props.endpoint ? this.props.  : null,
	// 	payloadKey: this.props.payloadKey ? this.props.payloadKey : null,
	// 	token: this.props.token ? this.props.token : null,
	// 	callbackUrl: this.props.callbackUrl ? this.props.callbackUrl : null,
	// 	loading: false
	// }
	const defaultProps = {
		onSuccess: undefined,
		onFailure: undefined,
		onStartUpload: undefined,
		alertTitle: 'Please Allow Access',
		alertMessage: [
			'This applicaton needs access to your photo library to upload images.',
			'\n\n',
			'Please go to Settings of your device and grant permissions to Photos.',
		].join(''),
		alertNo: 'Not Now',
		alertYes: 'Settings',
	};

	const askPermission = async () => {
		// only if user allows permission to camera roll
		const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		// const {onStartUpload} = this.props;

		// On Android users are prompted every time,
		// so no need to show additional Alert
		if (status !== 'granted') {
			if (Platform.OS === 'ios') showAlert();
			return;
		}
	}

	const showAlert = () => {
		// const {alertMessage, alertTitle, alertYes, alertNo} = this.props;

		Alert.alert(
			defaultProps.alertTitle,
			defaultProps.alertMessage,
			[
				{text: defaultProps.alertNo, style: 'cancel'},
				{text: defaultProps.alertYes, onPress: () => Linking.openURL('app-settings:')},
			],
		);
	}

	const uploadResult = async () => {
		const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		// const {onStartUpload} = this.props;
		console.log(status, 'status');
		if (status !== 'granted') {
			if (Platform.OS === 'ios') this.showAlert();
			return;
		}
		ImagePicker.launchImageLibraryAsync({
			mediaTypes: 'Images'
		}).then((result) => {
			console.log(result, 'result');
			const file = result.uri;
			if (!result.cancelled) {
				setLoading(true)
				uploadImageAsync(result.uri).then((reponse) => {
					console.log(reponse, 'reponse');
					setLoading(false)
					console.log('file', file)
					setImage(file)
					// this.setState({
					// 	uploaded_photo: file
					// })
				});
			}
		})
	}
	const uploadImageAsync = async (uri: string) => {
		const uriParts = uri.split('.');
		const fileType = uriParts[uriParts.length - 1];
		console.log('uri', uri)
		console.log('fileType', fileType)
		// const {headers} = this.props;
		// const endpoint = this.state.endpoint; // Define Endpoint Here
		// const payloadKey = this.state.poayloadKey; // Define PayloadKey here Ex. 'file'
		// const method = 'POST';
		// const formData = new FormData();
		// formData.append(payloadKey, {
		// 	uri,
		// 	name: 'test',
		// 	// name: uid(),
		// 	type: `image/${fileType}`,
		// });
		// const options = {
		// 	method,
		// 	body: formData,
		// 	headers: {
		// 		Accept: 'application/json',
		// 		'Content-Type': 'multipart/form-data',
		// 		'Authorization': this.state.token, // If restricted provide appropriate token here otherwise ignore or remove this line
		// 	},
		// };

		// return fetch(endpoint, options);
	}

	if (loading) {
		return (
			<View style={[style.container]}>
				<ActivityIndicator size="large" color="#FF8241" />
			</View>
		)
	}

	return (
		<View style={style.imgwrapper}>
			{callbackUrl
				? <Image source={{uri: uploadedImage ? uploadedImage : callbackUrl}}
					style={{width: 80, height: 80, borderRadius: 40}} />
				: <Image source={{uri: 'https://www.royaleboost.com/template/default-profile-img.png'}}
					style={{width: 80, height: 80}} />}

			<TouchableOpacity
				style={style.circleWrapper}
				onPress={() => {
					this.uploadResult();
				}}
			>
				<View />
			</TouchableOpacity>
		</View>
	)
}

const style = StyleSheet.create({
	imgwrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		marginBottom: 80,
	},
	circleWrapper: {
		backgroundColor: '#ECECEC',
		height: 22,
		width: 22,
		borderWidth: 3,
		borderColor: '#ffffff',
		borderRadius: 11,
		marginLeft: 70,
		marginTop: -80,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

export default Component
