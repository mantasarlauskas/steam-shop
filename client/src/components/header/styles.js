export default theme => ({
	root: {
		flexGrow: 1
	},
	bar: {
		backgroundColor: '#343a40'
	},
	linkDark: {
		color: '#000',
		'&:hover': {
			color: '#000'
		}
	},
	link: {
		color: '#FFF',
		'&:hover': {
			color: '#FFF'
		}
	},
	linkIcon: {
		marginRight: 10
	},
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	login: {
		margin: '0 20px',
		[theme.breakpoints.down('xs')]: {
			marginRight: 0
		}
	}
});
