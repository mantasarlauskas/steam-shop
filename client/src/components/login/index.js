import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import TextField from '../textField';
import withForm from '../withForm';
import {getModalStyle, styles} from '../../styles/auth';

const textFields = [
	{
		empty: false,
		value: '',
		id: 'username',
		label: 'Username'
	},
	{
		empty: false,
		value: '',
		id: 'password',
		label: 'Password'
	}
];

class Login extends Component {
	state = {
		width: window.innerWidth,
	};

	componentDidMount() {
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		const {resetMessages} = this.props;
		resetMessages();
	}

	updateWindowDimensions = () => {
		this.setState({ width: window.innerWidth });
	};

	handleRedirect = () => {
		const {showRegistrationForm, hideLoginForm} = this.props;
		hideLoginForm();
		showRegistrationForm();
	};

	handleSubmit = event => {
		const {validateForm, translateValuesToObject, loginUser} = this.props;
		event.preventDefault();
		validateForm() && loginUser(translateValuesToObject());
	};

	renderField = ({id, label, empty}) => {
		const {handleChange} = this.props;
		return (
			<TextField
				key={id}
				id={id}
				label={label}
				empty={empty}
				onChange={handleChange}
				type={id === 'password' ? 'password' : 'text'}
			/>
		);
	};

	render() {
		const {
			classes,
			error,
			renderError,
			success,
			renderSuccess,
			textFields,
			hideLoginForm
		} = this.props;
		const { width } = this.state;
		return (
			<Modal open={true} onClose={hideLoginForm}>
				<div style={getModalStyle(width)} className={`${classes.paper} ${classes.modal}`}>
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.icon}
						onClick={hideLoginForm}
					>
						<CloseIcon/>
					</IconButton>
					<Typography
						variant="h4"
						align="center"
						gutterBottom
						className={classes.title}
					>
						Login
					</Typography>
					{error && renderError()}
					{success && renderSuccess()}
					<form onSubmit={this.handleSubmit} noValidate>
						{textFields.map(this.renderField)}
						<Button color="primary" onClick={this.handleRedirect}>
							Registration
						</Button>
						<div className={classes.submitWrapper}>
							<Button
								variant="contained"
								color="primary"
								type="submit"
								className={classes.submit}
								size="large"
							>
								Submit
							</Button>
						</div>
					</form>
				</div>
			</Modal>
		);
	}
}

Login.propTypes = {
	resetMessages: PropTypes.func.isRequired,
	showRegistrationForm: PropTypes.func.isRequired,
	hideLoginForm: PropTypes.func.isRequired,
	translateValuesToObject: PropTypes.func.isRequired,
	validateForm: PropTypes.func.isRequired,
	loginUser: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	error: PropTypes.string.isRequired,
	renderError: PropTypes.func.isRequired,
	success: PropTypes.string.isRequired,
	renderSuccess: PropTypes.func.isRequired,
	textFields: PropTypes.array.isRequired
};

export default withStyles(styles)(withForm(Login, textFields));
