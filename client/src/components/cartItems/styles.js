export default theme => ({
	heading: {
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		},
		textAlign: 'center',
		padding: '0 25px'
	},
	totalPrice: {
		color: theme.palette.error.dark,
		margin: '15px 0',
		float: 'right'
	}
});
