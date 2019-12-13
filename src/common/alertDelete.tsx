import Alert from './alert'

interface Props {
	deleteAction: () => void
}

function Component({deleteAction}: Props) {
	Alert({
		title: '',
		message: '',
		yesAction: deleteAction,
	})
}

export default Component
