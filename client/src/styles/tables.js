import green from '@material-ui/core/colors/green';

export const styles = theme => ({
	root: {
		marginTop: 30
	},
	tableWrapper: {
		overflowX: 'auto'
	},
	row: {
		height: 65
	},
	button: {
		marginRight: 10,
		marginBottom: 10,
		[theme.breakpoints.up('md')]: {
			float: 'right',
			marginRight: 0,
			marginBottom: 0
		}
	},
	error: {
		backgroundColor: theme.palette.error.dark,
		'&:hover': {
			backgroundColor: theme.palette.error.dark,
		}
	},
	success: {
		backgroundColor: green[600]
	},
	message: {
		color: '#FFF'
	},
	icon: {
		marginRight: 5
	},
	paper: {
		padding: 20
	},
	text: {
		marginBottom: 10
	},
	editButton: {
		marginRight: 5
	},
	smallHide: {
		[theme.breakpoints.down('xs')]: {
			display: 'none'
		}
	}
});
