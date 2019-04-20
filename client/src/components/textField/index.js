import React from "react";
import PropTypes from "prop-types";
import Field from "@material-ui/core/TextField";

const TextField = ({
  empty,
  id,
  label,
  item,
  type,
  additionalProps,
  onChange
}) => (
  <Field
    error={empty}
    defaultValue={item && item[id]}
    id={id}
    label={label}
    type={type}
    autoComplete="off"
    margin="normal"
    onChange={onChange(id)}
    variant="outlined"
    fullWidth
    {...additionalProps}
  />
);

TextField.propTypes = {
  empty: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  item: PropTypes.object,
  additionalProps: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string
};

TextField.defaultValues = {
  item: null,
  additionalProps: null,
  type: "text"
};

export default TextField;
