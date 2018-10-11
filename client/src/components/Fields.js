import React from 'react';

const displayError = (touched, error) => touched && error && <div className="alert alert-danger py-1">{ error }</div>;

export const Input = ({ input, id, label, type, meta: { touched, error } }) => (
  <div className="form-group mb-4">
    <label htmlFor={id}>{ label }</label>
    <input 
      {...input} 
      id={id} 
      type={type} 
      className="form-control mb-2" 
    />
    { displayError(touched, error) }
  </div>
);

export const Textarea = ({ input, id, label, meta: { touched, error } }) => (
  <div className="form-group mb-4">
    <label htmlFor={id}>{ label }</label>
    <textarea 
      {...input} 
      id={id} 
      className="form-control mb-2" 
    />
    { displayError(touched, error) }
  </div>
);

export const Image = ({ input: { value, ...input }, id, label, meta: { touched, error } }) => (
  <div className="form-group mb-4">
    <label htmlFor={id}>{ label }</label>
    <input
      {...input} 
      id={id} 
      className="form-control-file mb-2"
      type="file" 
      alt="Product Logo"
      accept="image/png,image/jpeg"
    />
    { displayError(touched, error) }
  </div>
);