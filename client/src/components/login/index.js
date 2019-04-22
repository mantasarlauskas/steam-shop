import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from "@material-ui/core/Modal";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import TextField from "../textField";
import withForm from "../withForm";
import { getModalStyle, styles } from "../../styles/auth";

const textFields = [
  {
    empty: false,
    value: "",
    id: "username",
    label: "Prisijungimo vardas"
  },
  {
    empty: false,
    value: "",
    id: "password",
    label: "Slaptažodis"
  }
];

class Login extends Component {
  handleSubmit = event => {
    const { validateForm, translateValuesToObject, submitLogin } = this.props;
    event.preventDefault();
    validateForm() && submitLogin(translateValuesToObject());
  };

  renderField = ({ id, label, empty }) => {
    const { handleChange } = this.props;
    return (
      <TextField
        key={id}
        id={id}
        label={label}
        empty={empty}
        onChange={handleChange}
        type={id === "password" ? "password" : "text"}
      />
    );
  };

  render() {
    const {
      isOpen,
      classes,
      error,
      renderError,
      success,
      renderSuccess,
      textFields,
      redirectFromLoginToRegistration,
      closeLogin
    } = this.props;
    return (
      <Modal open={isOpen} onClose={closeLogin}>
        <div style={getModalStyle()} className={classes.paper}>
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.icon}
            onClick={closeLogin}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            className={classes.title}
          >
            Prisijungimas
          </Typography>
          {error && renderError()}
          {success && renderSuccess()}
          <form onSubmit={this.handleSubmit} noValidate>
            {textFields.map(this.renderField)}
            <Button color="primary" onClick={redirectFromLoginToRegistration}>
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
    );
  }
}

Login.propTypes = {
  translateValuesToObject: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  submitLogin: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired,
  renderError: PropTypes.func.isRequired,
  success: PropTypes.string.isRequired,
  renderSuccess: PropTypes.func.isRequired,
  textFields: PropTypes.array.isRequired,
  redirectFromLoginToRegistration: PropTypes.func.isRequired,
  closeLogin: PropTypes.func.isRequired
};

export default withStyles(styles)(withForm(Login, textFields));
