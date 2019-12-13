import React from 'react'

import {TextInput} from 'react-native';

interface Props {
	[s: string]: string
}
const Component: React.SFC<Props> = ({...rest}) => {
	return (
		<TextInput
			multiline
			numberOfLines={8}
			editable
			maxLength={40}
			{...rest} // Inherit any props passed to it; e.g., multiline, numberOfLines below
		/>
	)
}

export default Component
