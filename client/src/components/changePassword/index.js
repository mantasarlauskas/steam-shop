import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "../textField";
import withForm from "../withForm";
import { styles } from "../../styles/form";

const textFields = [
  {
    value: "",
    id: "currentPassword",
    label: "Dabartinis slaptažodis",
    empty: false
  },
  {
    value: "",
    id: "password1",
    label: "Naujas slaptažodis",
    empty: false
  },
  {
    value: "",
    id: "password2",
    label: "Naujo slaptažodžio pakartojimas",
    empty: false
  }
];

class ChangePassword extends Component {
  componentWillUnmount() {
    const { resetMessages } = this.props;
    resetMessages();
  }

  validateForm = () => {
    const { textFields, validateForm, setError } = this.props;
    let errCount = 0;
    errCount += !validateForm();
    if (errCount === 0) {
      errCount = 1;
      if (textFields[1].value.length < 6) {
        setError("Slaptažodis turi būti sudarytas bent iš 6 simbolių");
      } else if (textFields[1].value !== textFields[2].value) {
        setError("Slaptažodžiai privalo sutapti");
      } else {
        errCount = 0;
      }
    }
    return errCount === 0;
  };

  handleSubmit = event => {
    const { changePassword, translateValuesToObject } = this.props;
    event.preventDefault();
    this.validateForm() && changePassword(translateValuesToObject());
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
        type={"password"}
      />
    );
  };

  renderForm = () => {
    const { classes, textFields } = this.props;
    return (
      <form onSubmit={this.handleSubmit} noValidate>
        {textFields.map(this.renderField)}
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
    const { classes, error, success, renderError, renderSuccess } = this.props;
    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">Slaptažodžio keitimo forma</h1>
        <hr />
        <Paper className={classes.body}>
          {error && renderError()}
          {success && renderSuccess()}
          {this.renderForm()}
        </Paper>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  error: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired,
  renderError: PropTypes.func.isRequired,
  renderSuccess: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  resetMessages: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  validateForm: PropTypes.func.isRequired,
  textFields: PropTypes.array.isRequired,
  translateValuesToObject: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default withStyles(styles)(withForm(ChangePassword, textFields));
