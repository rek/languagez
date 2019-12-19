import React, {useState, useCallback} from "react";
import {
	ActivityIndicator,
	Button,
	// Clipboard,
	Image,
	// Share,
	StatusBar,
	StyleSheet,
	// Text,
	View
} from "react-native";
// import { Constants } from "expo";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

// To use the following code in your project, you have to install expo-permissions and expo-image-picker:
// expo install expo-permissions
// expo install expo-image-picker

interface Props {
	handleUpload?: (image: string) => void,
	renderUploadButton?: ({onPress: any}) => React.ReactElement,
	image?: string,
	children?: ({pickImage}: any) => any
	// children?: () => any
}

const Component: React.SFC<Props> = ({
	handleUpload,
	renderUploadButton,
	children,
	// image,
}) => {
	// const [internalImage, setImage] = useState(null);
	const [uploading, setUploading] = useState(false);

	// const share = useCallback(() => {
	// 	Share.share({
	// 		message: image,
	// 		title: "Check out this photo",
	// 		url: image
	// 	});
	// }, [image]);

	// const copyToClipboard = useCallback(() => {
	// 	Clipboard.setString(image);
	// 	alert("Copied image URL to clipboard");
	// }, [image]);

	const handleImagePicked = useCallback(async (pickerResult) => {
		// let uploadResponse, uploadResult;

		try {
			setUploading(true);

			if (!pickerResult.cancelled) {

				// handleUpload(uploadResponse.base64)
				// console.log('Image keys:', Object.keys(pickerResult))
				// console.log('Setting image:', pickerResult)

				// setImage(pickerResult.base64);
				handleUpload(pickerResult.base64)

				// uploadResponse = await uploadImageAsync(pickerResult.uri);
				// uploadResult = await uploadResponse.json();
				// setImage(uploadResult.location);
			}
		} catch (e) {
			// console.log({ uploadResponse });
			// console.log({ uploadResult });
			console.log({e});
			alert("Upload failed, sorry :(");
		} finally {
			setUploading(false);
		}
	}, []);

	// const takePhoto = useCallback(async () => {
	// 	const {status: cameraPerm} = await Permissions.askAsync(
	// 		Permissions.CAMERA
	// 	);

	// 	const {status: cameraRollPerm} = await Permissions.askAsync(
	// 		Permissions.CAMERA_ROLL
	// 	);

	// 	// only if user allows permission to camera AND camera roll
	// 	if (cameraPerm === "granted" && cameraRollPerm === "granted") {
	// 		const pickerResult = await ImagePicker.launchCameraAsync({
	// 			allowsEditing: true,
	// 			aspect: [4, 3]
	// 		});

	// 		handleImagePicked(pickerResult);
	// 	}
	// }, []);

	const pickImage = useCallback(async () => {
		const {status: cameraRollPerm} = await Permissions.askAsync(
			Permissions.CAMERA_ROLL
		);

		// only if user allows permission to camera roll
		if (cameraRollPerm === "granted") {
			const pickerResult = await ImagePicker.launchImageLibraryAsync({
				// allowsEditing: true,
				aspect: [3, 3],
				base64: true,
				quality: 0, // 1 is best
				// aspect: [4, 3]
			});

			// console.log('pickerResult', pickerResult)
			handleImagePicked(pickerResult);
		}
	}, []);

	const UploadButton = () => {
		if (renderUploadButton) {
			return renderUploadButton({onPress: pickImage})
		}

		return <Button onPress={pickImage} title="Upload" />
	}

	const render = () => {
		{/* <Button onPress={takePhoto} title="Take a photo" /> */}
		return <UploadButton />
	}

	return (
		<View style={styles.container}>
			<StatusBar barStyle="default" />

			{children
				? children({pickImage})
				: render()
			}

			{uploading && (
				<View style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
					<ActivityIndicator color="#fff" size="large" />
				</View>
			)}
		</View>
	);
}

// async function uploadImageAsync(uri) {
// console.log('uri', uri.base64)

// const apiUrl = "https://file-upload-example-backend-dkhqoilqqn.now.sh/upload";

// // Note:
// // Uncomment this if you want to experiment with local server
// //
// // if (Constants.isDevice) {
// //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
// // } else {
// //   apiUrl = `http://localhost:3000/upload`
// // }

// const uriParts = uri.split(".");
// const fileType = uriParts[uriParts.length - 1];

// const formData = new FormData();
// formData.append("photo", {
// 	uri,
// 	name: `photo.${fileType}`,
// 	type: `image/${fileType}`
// });

// const options = {
// 	method: "POST",
// 	body: formData,
// 	headers: {
// 		Accept: "application/json",
// 		"Content-Type": "multipart/form-data"
// 	}
// };

// return fetch(apiUrl, options);
// }

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		// margin: 10,
	},
	maybeRenderUploading: {
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.4)",
		justifyContent: "center"
	},
	maybeRenderContainer: {
		borderRadius: 3,
		elevation: 2,
		marginTop: 30,
		shadowColor: "rgba(0,0,0,1)",
		shadowOpacity: 0.2,
		shadowOffset: {
			height: 4,
			width: 4
		},
		shadowRadius: 5,
		width: 250
	},
	maybeRenderImageContainer: {
		borderTopLeftRadius: 3,
		borderTopRightRadius: 3,
		overflow: "hidden"
	},
	maybeRenderImage: {
		height: 60,
		width: 60
	},
	maybeRenderImageText: {
		paddingHorizontal: 10,
		paddingVertical: 10
	}
});

export default Component
