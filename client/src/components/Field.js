import React from 'react';
import { Field } from 'redux-form';
import { Select } from './Fields';
import { required, maxLength250, maxLength30, passwordsMatch, email, password } from '../formValidation';


const parse = (type, component) => type === "number" || component === Select ? 
  value => value !== '' ? Number(value) : value : undefined;

const getValidation = (type, component) => component === "input" && type === "password" ? [required, password, passwordsMatch] 
  : component === "input" && type === "email" ? [email, required] : [required];

export default ({ field: { id, title, type, component }, index, items }) => (
  <Field 
    key={index}
    name={id} 
    label={title} 
    id={id}
    parse={parse(type, component)}
    component={component}
    validate={getValidation(type, component)} 
    type={type}
    items={items}
  />
);