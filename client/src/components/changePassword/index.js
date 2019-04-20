import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import TextField from "../textField";
import { styles } from "../../styles/form";

class ChangePassword extends Component {
  state = {
    currentPassword: {
      value: "",
      id: "currentPassword",
      label: "Dabartinis slaptažodis",
      empty: false
    },
    password1: {
      value: "",
      id: "password1",
      label: "Naujas slaptažodis",
      empty: false
    },
    password2: {
      value: "",
      id: "password2",
      label: "Naujo slaptažodžio pakartojimas",
      empty: false
    },
    error: "",
    success: ""
  };

  componentDidUpdate({
    successMessage: prevSuccessMessage,
    errorMessage: prevErrorMessage
  }) {
    const { successMessage, errorMessage } = this.props;
    if (successMessage && prevSuccessMessage !== successMessage) {
      this.setState({ success: successMessage, error: "" });
    }
    if (errorMessage && prevErrorMessage !== errorMessage) {
      this.setState({ error: errorMessage, success: "" });
    }
  }

  componentWillUnmount() {
    const { resetMessages } = this.props;
    resetMessages();
  }

  handleChange = name => ({ target: { value } }) => {
    this.setState(prevState => ({
      [name]: {
        ...prevState[name],
        value,
        empty: value.length === 0
      }
    }));
  };

  validateField = field => {
    if (field.value === "") {
      this.setState(prevState => ({
        [field.id]: {
          ...prevState[field.id],
          empty: true
        }
      }));
      return false;
    }
    return true;
  };

  validateForm = () => {
    const { currentPassword, password1, password2 } = this.state;
    const errCount =
      !this.validateField(currentPassword) +
      !this.validateField(password1) +
      !this.validateField(password2);
    const matchError = password1.value !== password2.value;
    if (errCount > 0) {
      this.setState({ error: "Formoje negali būti tuščių laukų", success: "" });
    } else if (matchError) {
      this.setState({ error: "Slaptažodžiai privalo sutapti", success: "" });
    }
    return errCount === 0 && !matchError;
  };

  handleSubmit = event => {
    const { currentPassword, password1 } = this.state;
    const { changePassword } = this.props;
    event.preventDefault();
    if (this.validateForm()) {
      changePassword({
        currentPassword: currentPassword.value,
        newPassword: password1.value
      });
      this.setState({
        error: "",
        success: ""
      });
    }
  };

  renderMessage = (className, message, Icon) => {
    const { classes } = this.props;
    return (
      <SnackbarContent
        className={className}
        message={
          <span>
            <Icon className={classes.errorIcon} />
            {message}
          </span>
        }
      />
    );
  };

  renderField = ({ id, label, empty }) => (
    <TextField
      id={id}
      label={label}
      empty={empty}
      onChange={this.handleChange}
      type={"password"}
    />
  );

  renderForm = () => {
    const { classes } = this.props;
    const { currentPassword, password1, password2 } = this.state;
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        {this.renderField(currentPassword)}
        {this.renderField(password1)}
        {this.renderField(password2)}
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
    );
  };

  render() {
    const { classes } = this.props;
    const { error, success } = this.state;
    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">Slaptažodžio keitimo forma</h1>
        <hr />
        <Paper className={classes.body}>
          {error && this.renderMessage(classes.error, error, ErrorIcon)}
          {success &&
            this.renderMessage(classes.success, success, CheckCircleIcon)}
          {this.renderForm()}
        </Paper>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  successMessage: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired,
  changePassword: PropTypes.func.isRequired,
  resetMessages: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChangePassword);
