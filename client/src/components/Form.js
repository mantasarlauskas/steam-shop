import React from 'react';
import Field from './Field';

export default ({ handleSubmit, fields, additionalText, dataTarget, errorMessage, successMessage }) => (
  <form className="form clearfix" onSubmit={handleSubmit} noValidate>
      { errorMessage && <div className="alert alert-danger py-1">{ errorMessage }</div> }
      { successMessage && <div className="alert alert-success py-1">{ successMessage }</div> }
      { fields.map((field, index) => <Field key={index} field={field} index={index} />) }
      { additionalText && 
          <div className="btn-link" onClick={dataTarget}>{ additionalText }</div> 
      }
      <button type="submit" className="btn btn-primary">Patvirtinti</button>
      <button className="btn btn-secondary">Uždaryti</button>
  </form>
);