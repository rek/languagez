import React from 'react';
import {StyleSheet, View, Button, Text, TouchableOpacity} from 'react-native';

export const Active = () => {

}

export const Simple = ({title, onPress, styles = {}}) => {
	return (
		<View style={{
			height: 40,
			margin: 3,
			...styles
		}}>
			<Button
				title={title}
				onPress={onPress}
			/>
		</View>
	)
}

export const ShortButton = (props) => {
	return (
		<Simple
			{...props}
			styles={{...props.styles, width: 100, marginLeft: 10}}
		/>
	)
}

export const Clickable: React.SFC<{
	children: React.ReactElement,
	onPress: () => void,
	style?: any
}> = ({
	onPress, children, style
}) => {
	return (
		<TouchableOpacity
			style={style}
			onPress={onPress}
		>
			{children}
		</TouchableOpacity >
	)
}

interface CustomProps {
	style?: any,
	title?: string,
	children?: React.ReactElement,
	onPress: () => void,
}
export const Custom: React.SFC<CustomProps> = ({
	style, title, onPress, children
}) => {
	let stylesToAdd = [styles.empty]

	if (style) {
		stylesToAdd = Array.isArray(style) ? style : [style]
	}

	return (
		<Clickable
			style={[styles.default, stylesToAdd]}
			onPress={onPress}
		>
			{children || <Text>{title}</Text>}
		</Clickable>
	)
}

const styles = StyleSheet.create({
	default: {
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 10
	},
	empty: {}
})

export default Custom
