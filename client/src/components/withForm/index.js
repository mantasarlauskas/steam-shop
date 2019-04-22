import React, { Component } from "react";
import PropTypes from "prop-types";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";

export default (WrappedComponent, fields) => {
  class WithForm extends Component {
    state = {
      textFields: fields,
      error: "",
      success: ""
    };

    componentDidMount() {
      const { successMessage, errorMessage } = this.props;
      successMessage && this.setSuccess(successMessage);
      errorMessage && this.setError(errorMessage);
    }

    componentDidUpdate({
      successMessage: prevSuccessMessage,
      errorMessage: prevErrorMessage
    }) {
      const { successMessage, errorMessage } = this.props;
      if (prevSuccessMessage !== successMessage) {
        this.setSuccess(successMessage);
      }
      if (prevErrorMessage !== errorMessage) {
        this.setError(errorMessage);
      }
    }

    initState = product => {
      this.setState(prevState => ({
        textFields: prevState.textFields.map(field => ({
          ...field,
          value: product[field.id]
        }))
      }));
    };

    handleChange = name => ({ target: { value } }) => {
      this.setState(prevState => ({
        textFields: prevState.textFields.map(field =>
          field.id === name
            ? { ...field, value, empty: value.length === 0 }
            : field
        )
      }));
    };

    translateValuesToObject = () => {
      const { textFields } = this.state;
      return textFields.reduce((acc, { id, value }) => {
        return {
          ...acc,
          [id]: value
        };
      }, {});
    };

    validateField = ({ id, value }) => {
      if (value === "") {
        this.setState(prevState => ({
          textFields: prevState.textFields.map(field =>
            field.id === id ? { ...field, empty: true } : field
          ),
          error: "Formoje negali būti tuščių laukų",
          success: ""
        }));
        return false;
      }
      return true;
    };

    validateForm = () => {
      const { textFields } = this.state;
      let errCount = 0;
      textFields.forEach(field => !this.validateField(field) && errCount++);
      return errCount === 0;
    };

    setError = message => {
      this.setState({
        error: message,
        success: ""
      });
    };

    setSuccess = message => {
      this.setState({
        success: message,
        error: ""
      });
    };

    renderError = () => {
      const { classes } = this.props;
      const { error } = this.state;
      return (
        <SnackbarContent
          className={classes.error}
          message={
            <span>
              <ErrorIcon className={classes.errorIcon} />
              {` ${error}`}
            </span>
          }
        />
      );
    };

    renderSuccess = message => {
      const { classes } = this.props;
      const { success } = this.state;
      return (
        <SnackbarContent
          className={classes.success}
          message={
            <span>
              <CheckCircleIcon className={classes.errorIcon} />
              {` ${success}`}
            </span>
          }
        />
      );
    };

    render() {
      const { textFields, error, success } = this.state;
      return (
        <WrappedComponent
          textFields={textFields}
          validateForm={this.validateForm}
          setError={this.setError}
          setSuccess={this.setSuccess}
          renderSuccess={this.renderSuccess}
          initState={this.initState}
          handleChange={this.handleChange}
          renderError={this.renderError}
          translateValuesToObject={this.translateValuesToObject}
          error={error}
          success={success}
          {...this.props}
        />
      );
    }
  }

  WithForm.propTypes = {
    classes: PropTypes.object.isRequired,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string
  };

  WithForm.defaultValues = {
    successMessage: "",
    errorMessage: ""
  };

  return WithForm;
};
