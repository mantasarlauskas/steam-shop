import green from '@material-ui/core/colors/green';

export const getModalStyle = (width) => {
	let props = {};
	if (width < 576) {
		props = {width: '90%'};
	}
	return {
		...props,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	};
};

export const styles = theme => ({
	paper: {
		position: 'absolute',
		width: theme.spacing.unit * 50,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		paddingTop: theme.spacing.unit * 3,
		paddingBottom: theme.spacing.unit * 3,
		paddingLeft: theme.spacing.unit * 4,
		paddingRight: theme.spacing.unit * 4,
	},
	field: {
		width: '100%'
	},
	icon: {
		float: 'right',
		outline: 'none'
	},
	title: {
		clear: 'both'
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
	error: {
		backgroundColor: theme.palette.error.dark,
		marginBottom: 10
	},
	success: {
		backgroundColor: green[600],
		marginBottom: 10
	},
	messageIcon: {
		fontSize: 20,
		opacity: 0.9,
		marginRight: theme.spacing.unit,
	},
	submitWrapper: {
		position: 'relative',
		height: 75
	},
	submit: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)'
	}
});
