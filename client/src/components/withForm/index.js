import React, { Component } from "react";
import PropTypes from "prop-types";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import ErrorIcon from "@material-ui/icons/Error";

export default (WrappedComponent, fields) => {
  class WithForm extends Component {
    state = {
      textFields: fields,
      error: false
    };

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
          error: true
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

    setError = () => {
      this.setState({
        error: true
      });
    };

    renderError = message => {
      const { classes } = this.props;
      return (
        <SnackbarContent
          className={classes.error}
          message={
            <span>
              <ErrorIcon className={classes.errorIcon} />
              {message}
            </span>
          }
        />
      );
    };

    render() {
      const { textFields, error } = this.state;
      return (
        <WrappedComponent
          textFields={textFields}
          validateForm={this.validateForm}
          setError={this.setError}
          initState={this.initState}
          handleChange={this.handleChange}
          renderError={this.renderError}
          translateValuesToObject={this.translateValuesToObject}
          error={error}
          {...this.props}
        />
      );
    }
  }

  WithForm.propTypes = {
    classes: PropTypes.object.isRequired
  };

  return WithForm;
};
