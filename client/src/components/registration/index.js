import React, { Component } from "react";
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
    type: "text",
    label: "Prisijungimo vardas"
  },
  {
    empty: false,
    value: "",
    id: "email",
    type: "email",
    label: "El. paštas"
  },
  {
    empty: false,
    value: "",
    id: "password",
    type: "password",
    label: "Slaptažodis"
  },
  {
    empty: false,
    value: "",
    id: "password2",
    type: "password",
    label: "Slaptažodio pakartojimas"
  }
];

class Registration extends Component {
  validateForm = () => {
    const { textFields, validateForm, setError } = this.props;
    let errCount = 0;
    errCount += !validateForm();
    if (errCount === 0) {
      errCount = 1;
      if (textFields[0].value.length < 6) {
        setError("Vardas turi būti sudarytas bent iš 6 simbolių");
      } else if (textFields[2].value.length < 6) {
        setError("Slaptažodis turi būti sudarytas bent iš 6 simbolių");
      } else if (textFields[2].value !== textFields[3].value) {
        setError("Slaptažodžiai turi sutapti");
      } else {
        errCount = 0;
      }
    }
    return errCount === 0;
  };

  handleSubmit = event => {
    const { submitRegistration, translateValuesToObject } = this.props;
    event.preventDefault();
    this.validateForm() && submitRegistration(translateValuesToObject());
  };

  renderField = ({ id, label, empty, type }) => {
    const { handleChange } = this.props;
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
      isOpen,
      closeRegistration,
      classes,
      renderError,
      error,
      textFields
    } = this.props;
    return (
      <Modal open={isOpen} onClose={closeRegistration}>
        <div style={getModalStyle()} className={classes.paper}>
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.icon}
            onClick={closeRegistration}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            className={classes.title}
          >
            Registracija
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
                Registruotis
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(withForm(Registration, textFields));
