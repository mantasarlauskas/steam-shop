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
		type: 'text',
		label: 'Username'
	},
	{
		empty: false,
		value: '',
		id: 'email',
		type: 'email',
		label: 'Email'
	},
	{
		empty: false,
		value: '',
		id: 'password',
		type: 'password',
		label: 'Password'
	},
	{
		empty: false,
		value: '',
		id: 'password2',
		type: 'password',
		label: 'Repeat password'
	}
];

class Registration extends Component {
	state = {
		width: window.innerWidth,
	};

	componentDidMount() {
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		const {resetErrorMessage} = this.props;
		resetErrorMessage();
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions = () => {
		this.setState({ width: window.innerWidth });
	};

	validateForm = () => {
		const {textFields, validateForm, setError} = this.props;
		let errCount = 0;
		errCount += !validateForm();
		if (errCount === 0) {
			errCount = 1;
			if (textFields[0].value.length < 6) {
				setError('Username must be longer than 5 symbols');
			} else if (textFields[2].value.length < 6) {
				setError('Password must be longer than 5 symbols');
			} else if (textFields[2].value !== textFields[3].value) {
				setError('Passwords must match');
			} else {
				errCount = 0;
			}
		}
		return errCount === 0;
	};

	handleSubmit = event => {
		const {registerUser, translateValuesToObject} = this.props;
		event.preventDefault();
		this.validateForm() && registerUser(translateValuesToObject());
	};

	renderField = ({id, label, empty, type}) => {
		const {handleChange} = this.props;
		return (
			<TextField
				key={id}
				id={id}
				label={label}
				empty={empty}
				onChange={handleChange}
				type={type}
			/>
		);
	};

	render() {
		const {
			hideRegistrationForm,
			classes,
			renderError,
			error,
			textFields
		} = this.props;
		const { width } = this.state;
		return (
			<Modal open={true} onClose={hideRegistrationForm}>
				<div style={getModalStyle(width)} className={classes.paper}>
					<IconButton
						key="close"
						aria-label="Close"
						color="inherit"
						className={classes.icon}
						onClick={hideRegistrationForm}
					>
						<CloseIcon/>
					</IconButton>
					<Typography
						variant="h4"
						align="center"
						gutterBottom
						className={classes.title}
					>
						Registration
					</Typography>
					{error && renderError()}
					<form onSubmit={this.handleSubmit} noValidate>
						{textFields.map(this.renderField)}
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

Registration.propTypes = {
	resetErrorMessage: PropTypes.func.isRequired,
	textFields: PropTypes.array.isRequired,
	validateForm: PropTypes.func.isRequired,
	setError: PropTypes.func.isRequired,
	registerUser: PropTypes.func.isRequired,
	translateValuesToObject: PropTypes.func.isRequired,
	handleChange: PropTypes.func.isRequired,
	hideRegistrationForm: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
	renderError: PropTypes.func.isRequired,
	error: PropTypes.string.isRequired
};

export default withStyles(styles)(withForm(Registration, textFields));
