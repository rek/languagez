import Alert from './alert'

interface Props {
	deleteAction: () => void
}

function Component({deleteAction}: Props) {
	Alert({
		title: 'Are you sure you want to delete?',
		message: '',
		yesAction: deleteAction,
	})
}

export default Component
