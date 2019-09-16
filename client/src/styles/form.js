import green from '@material-ui/core/colors/green';

export const styles = theme => ({
	root: {
		marginTop: 30
	},
	body: {
		padding: '20px 50px',
		[theme.breakpoints.down('sm')]: {
			padding: 20
		}
	},
	label: {
		margin: '20px 0',
		width: 200
	},
	fileName: {
		display: 'inline-block',
		marginLeft: 5
	},
	submitWrapper: {
		position: 'relative',
		height: 50,
		marginBottom: 30
	},
	submit: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translateX(-50%) translateY(-50%)'
	},
	error: {
		backgroundColor: theme.palette.error.dark,
		position: 'relative',
		left: '50%',
		transform: 'translateX(-50%)'
	},
	errorIcon: {
		marginRight: 10
	},
	select: {
		marginBottom: 15,
		width: 400,
		[theme.breakpoints.down('sm')]: {
			maxWidth: 250
		}
	},
	success: {
		backgroundColor: green[600],
		position: 'relative',
		left: '50%',
		transform: 'translateX(-50%)'
	}
});
