import React from 'react';

export const Input = ({ input, id, label, type, meta: { touched, error } }) => (
  <div className="form-group mb-4">
    <label htmlFor={id}>{ label }</label>
    <input 
      {...input} 
      id={id} 
      type={type} 
      className="form-control mb-2" 
    />
    { touched && error && <div className="alert alert-danger py-1">{ error }</div> }
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
    { touched && error && <div className="alert alert-danger py-1">{ error }</div> }
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
    { touched && error && <div className="alert alert-danger py-1">{ error }</div> }
  </div>
);

export const Select = ({ input, id, label, items, meta: { touched, error } }) => (
  <div className="form-group mb-4">
    <label htmlFor={id}>{ label }</label>
    <select  
      {...input} 
      id={id}
      className={"form-control mb-2"}
    >
      <option value="" disabled hidden>Pasirinkite</option>
      { items.map(item => <option key={item.id} value={item.id}>{ item.title }</option>) }
    </select>
    { touched && error && <div className="alert alert-danger py-1">{ error }</div> }
  </div>
);