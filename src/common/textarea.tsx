import React from 'react'

import {TextInput} from 'react-native';

interface Props {
	onChangeText: (text: string) => void,
	[s: string]: string
}
const Component: React.SFC<Props> = ({onChangeText, ...rest}) => {
	return (
		<TextInput
			multiline
			numberOfLines={8}
			editable
			onChangeText={onChangeText}
			// maxLength={40}
			style={{borderWidth: 1, margin: 10}}
			{...rest} // Inherit any props passed to it; e.g., multiline, numberOfLines below
		/>
	)
}

export default Component
