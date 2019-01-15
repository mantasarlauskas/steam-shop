import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {styles} from '../styles/form';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPassword: {
        value: '',
        empty: false
      },
      password1: {
        value: '',
        empty: false
      },
      password2: {
        value: '',
        empty: false
      },
      error: '',
      success: ''
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {successMessage, errorMessage} = this.props;

    if (prevProps.successMessage !== successMessage && successMessage) {
      this.setState({
        success: successMessage
      })
    }

    if(prevProps.errorMessage !== errorMessage && errorMessage) {
      this.setState({
        error: errorMessage
      })
    }
  }

  handleChange = name => ({target: {value}}) => {
    this.setState({
      [name]: {
        value,
        empty: value.length === 0
      }
    });
  };

  setError = name => {
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        empty: true
      }
    }))
  };

  checkForErrors = () => {
    const {currentPassword, password1, password2} = this.state;
    let emptyError = false, matchError = false;

    if (currentPassword.value === '') {
      this.setError('currentPassword');
      emptyError = true;
    }

    if (password1.value === '') {
      this.setError('password1');
      emptyError = true;
    }

    if(password2.value === '') {
      this.setError('password2');
      emptyError = true;
    }

    if (password1.value !== password2.value) {
      matchError = true;
    }

    if (emptyError) {
      this.setState({
        error: 'Formoje negali būti tuščių laukų'
      });
    } else if (matchError) {
      this.setState({
        error: 'Slaptažodžiai privalo sutapti'
      });
    }

    return !emptyError && !matchError;
  };

  handleSubmit = event => {
    const {currentPassword, password1} = this.state;
    const {onSubmit} = this.props;

    event.preventDefault();

    this.setState({
      error: '',
      success: ''
    });

    if (this.checkForErrors()) {
      onSubmit({
        currentPassword: currentPassword.value,
        newPassword: password1.value
      });
    }
  };

  render() {
    const {classes} = this.props;
    const {currentPassword, password1, password2, error, success} = this.state;

    const displayMessage = (className, message, Icon) => {
      return (
        <SnackbarContent
          className={className}
          message={
            <span>
              <Icon className={classes.errorIcon}/>
              {message}
            </span>
          }
        />
      )
    };

    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">
          Slaptažodžio keitimo forma
        </h1>
        <hr/>
        <Paper className={classes.body}>
          {error.length > 0 && displayMessage(classes.error, error, ErrorIcon)}
          {success.length > 0 && displayMessage(classes.success, success, CheckCircleIcon)}
          <form onSubmit={this.handleSubmit} noValidate>
            <TextField
              error={currentPassword.empty}
              id="currentPassword"
              label="Dabartinis slaptažodis"
              autoComplete="off"
              margin="normal"
              type="password"
              onChange={this.handleChange("currentPassword")}
              variant="outlined"
              fullWidth
            />
            <TextField
              error={password1.empty}
              id="password1"
              label="Naujas slaptažodis"
              autoComplete="off"
              margin="normal"
              type="password"
              onChange={this.handleChange("password1")}
              variant="outlined"
              fullWidth
            />
            <TextField
              error={password2.empty}
              id="password2"
              label="Naujo slaptažodžio pakartojimas"
              autoComplete="off"
              margin="normal"
              type="password"
              onChange={this.handleChange("password2")}
              variant="outlined"
              fullWidth
            />
            <div className={classes.submitWrapper}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                size="large"
                className={classes.submit}
                align="center"
              >
                Patvirtinti
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(ChangePassword);