import React from "react";
import PropTypes from "prop-types";
import Field from "@material-ui/core/TextField";

const TextField = ({
  field: { empty, id, label },
  item,
  additionalProps,
  onChange
}) => (
  <Field
    error={empty}
    defaultValue={item && item[id]}
    id={id}
    label={label}
    autoComplete="off"
    margin="normal"
    onChange={onChange(id)}
    variant="outlined"
    fullWidth
    {...additionalProps}
  />
);

TextField.propTypes = {
  field: PropTypes.object.isRequired,
  item: PropTypes.object,
  additionalProps: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

TextField.defaultValues = {
  item: null,
  additionalProps: null
};

export default TextField;
