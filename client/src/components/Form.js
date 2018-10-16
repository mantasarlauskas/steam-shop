import React from 'react';
import Field from './Field';

export default ({ handleSubmit, fields, errorMessage, successMessage, nameOfClass, items }) => (
  <form className={nameOfClass ? `form clearfix ${nameOfClass}` : "form clearfix"} onSubmit={handleSubmit} noValidate>
    { errorMessage && <div className="alert alert-danger py-1">{ errorMessage }</div> }
    { successMessage && <div className="alert alert-success py-1">{ successMessage }</div> }
    { fields.map((field, index) => <Field key={index} field={field} index={index} items={items} />) }
    <button type="submit" className="btn btn-primary">Patvirtinti</button>
  </form>
);