import React, {Component} from 'react';
import Modal from '@material-ui/core/Modal';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {getModalStyle, styles} from "../styles/auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      username: {
        empty: false,
        value: ''
      },
      password: {
        empty: false,
        value: ''
      }
    };

    this.state = this.initialState;
  }

  handleChange = name => ({target: {value}}) => {
    this.setState({
      [name]: {
        empty: value.length === 0,
        value
      }
    });
  };

  handleSubmit = event => {
    const {onError, onSubmit} = this.props;
    const {username, password} = this.state;

    event.preventDefault();

    if (username.value.length === 0 || password.value.length === 0) {
      onError("Formoje negali būti tuščių laukelių");
    } else {
      onSubmit({
        username: username.value,
        password: password.value
      });
      this.setState(this.initialState);
    }
  };

  render() {
    const {
      isOpen,
      closeModal,
      classes,
      errorMessage,
      successMessage,
      targetData
    } = this.props;
    const {username, password} = this.state;

    const displayMessage = (className, message, Icon) => {
      return (
        <SnackbarContent
          className={className}
          message={
            <span className={classes.message}>
              <Icon className={classes.messageIcon}/>
              {message}
            </span>
          }
        />
      )
    };

    return (
      <Modal open={isOpen} onClose={closeModal}>
        <div style={getModalStyle()} className={classes.paper}>
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.icon}
            onClick={closeModal}
          >
            <CloseIcon/>
          </IconButton>
          <Typography variant="h4" align="center" gutterBottom className={classes.title}>
            Prisijungimas
          </Typography>
          {errorMessage && displayMessage(classes.error, errorMessage, ErrorIcon)}
          {successMessage && displayMessage(classes.success, successMessage, CheckCircleIcon)}
          <form onSubmit={this.handleSubmit} noValidate>
            <TextField
              error={username.empty}
              id="username"
              label="Prisijungimo vardas"
              className={classes.field}
              autoComplete="off"
              margin="normal"
              onChange={this.handleChange("username")}
              variant="outlined"
            />
            <TextField
              error={password.empty}
              id="password"
              label="Slaptažodis"
              className={classes.field}
              type="password"
              margin="normal"
              onChange={this.handleChange("password")}
              variant="outlined"
            />
            <Button color="primary" onClick={targetData}>
              Registracija
            </Button>
            <div className={classes.submitWrapper}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
                size="large"
              >
                Prisijungti
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default withStyles(styles)(Login);