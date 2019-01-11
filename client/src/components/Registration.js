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
import {getModalStyle, styles} from "../styles/auth";

class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: {
        empty: false,
        value: ''
      },
      username: {
        empty: false,
        value: ''
      },
      password1: {
        empty: false,
        value: ''
      },
      password2: {
        empty: false,
        value: ''
      }
    };
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
    const {email, username, password1, password2} = this.state;

    event.preventDefault();

    if (username.value.length === 0 || email.value.length === 0
      || password1.value.length === 0 || password2.value.length === 0) {
      onError("Formoje negali būti tuščių laukelių");
    } else if(username.value.length < 6) {
      onError("Vardas turi būti sudarytas bent iš 6 simbolių");
    } else if(password1.value.length < 6) {
      onError("Slaptažodis turi būti sudarytas bent iš 6 simbolių");
    } else if (password1.value !== password2.value) {
      onError("Slaptažodžiai turi sutapti");
    } else {
      onSubmit({
        username: username.value,
        email: email.value,
        password: password1.value
      });
    }
  };

  render() {
    const {
      isOpen,
      closeModal,
      classes,
      errorMessage
    } = this.props;
    const {username, email, password1, password2} = this.state;

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
            Registracija
          </Typography>
          {errorMessage && displayMessage(classes.error, errorMessage, ErrorIcon)}
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
              error={email.empty}
              id="email"
              label="El. paštas"
              className={classes.field}
              autoComplete="off"
              type="email"
              margin="normal"
              onChange={this.handleChange("email")}
              variant="outlined"
            />
            <TextField
              error={password1.empty}
              id="password1"
              label="Slaptažodis"
              className={classes.field}
              type="password"
              margin="normal"
              onChange={this.handleChange("password1")}
              variant="outlined"
            />
            <TextField
              error={password2.empty}
              id="password2"
              label="Slaptažodio pakartojimas"
              className={classes.field}
              type="password"
              margin="normal"
              onChange={this.handleChange("password2")}
              variant="outlined"
            />
            <div className={classes.submitWrapper}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.submit}
                size="large"
              >
                Registruotis
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default withStyles(styles)(Registration);