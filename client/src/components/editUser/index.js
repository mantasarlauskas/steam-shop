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
    empty: false,
    id: "email",
    label: "El. paštas"
  }
];

class EditUser extends Component {
  componentDidMount() {
    const { user, initState } = this.props;
    initState(user);
  }

  componentWillUnmount() {
    const { resetSuccessMessage } = this.props;
    resetSuccessMessage();
  }

  handleSubmit = event => {
    const {
      updateUser,
      translateValuesToObject,
      validateForm,
      setSuccess,
      user
    } = this.props;
    event.preventDefault();
    setSuccess("");
    validateForm() && updateUser({ ...translateValuesToObject(), id: user.id });
  };

  render() {
    const {
      classes,
      user,
      success,
      renderSuccess,
      textFields,
      handleChange
    } = this.props;
    return (
      <div className={`${classes.root} container`}>
        <h1 className="title">Profilio forma</h1>
        <hr />
        <Paper className={classes.body}>
          {success && renderSuccess()}
          <form onSubmit={this.handleSubmit} noValidate>
            <TextField
              {...textFields[0]}
              onChange={handleChange}
              item={user}
              type="email"
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
    );
  }
}

EditUser.propTypes = {
  user: PropTypes.object.isRequired,
  initState: PropTypes.func.isRequired,
  resetSuccessMessage: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  translateValuesToObject: PropTypes.func.isRequired,
  validateForm: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  success: PropTypes.string.isRequired,
  renderSuccess: PropTypes.func.isRequired,
  textFields: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default withStyles(styles)(withForm(EditUser, textFields));
