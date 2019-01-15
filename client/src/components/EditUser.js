import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {styles} from '../styles/form';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      email: {
        value: '',
        empty: false
      },
      error: '',
      success: ''
    };

    this.state = this.initialState;
  }

  componentDidMount() {
    const {user} = this.props;

    user && this.initState(user);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {user, successMessage} = this.props;

    if (prevProps.user !== user && user) {
      this.initState(user);
    }

    if (prevProps.successMessage !== successMessage && successMessage) {
      this.setState({
        success: successMessage
      })
    }
  };

  initState = user => {
    this.setState({
      email: {
        value: user.email,
        empty: false
      }
    })
  };

  handleChange = ({target: {value}}) => {
    this.setState({
      email: {
        value,
        empty: value.length === 0
      }
    });
  };

  setError = () => {
    this.setState({
      error: 'Formoje negali būti tuščių laukų'
    })
  };

  checkIfEmpty = () => {
    const {email} = this.state;

    if (email.value === '') {
      this.setError();
      return false;
    } else {
      return true;
    }
  };

  handleSubmit = event => {
    const {email} = this.state;
    const {onEdit, user} = this.props;

    event.preventDefault();

    this.setState({
      error: '',
      success: ''
    });

    if (this.checkIfEmpty()) {
      onEdit({
        id: user.id,
        email: email.value
      });
      this.setState(this.initialState);
    }
  };

  render() {
    const {classes, user} = this.props;
    const {email, error, success} = this.state;

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
          Profilio forma
        </h1>
        <hr/>
        <Paper className={classes.body}>
          {error.length > 0 && displayMessage(classes.error, error, ErrorIcon)}
          {success.length > 0 && displayMessage(classes.success, success, CheckCircleIcon)}
          <form onSubmit={this.handleSubmit} noValidate>
            <TextField
              error={email.empty}
              defaultValue={user.email}
              id="email"
              label="El. paštas"
              type="email"
              autoComplete="off"
              margin="normal"
              onChange={this.handleChange}
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

export default withStyles(styles)(EditUser);