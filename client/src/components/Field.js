import React from 'react';
import { Field } from 'redux-form';
import { Input, Textarea } from './Fields';
import { required, maxLength250, maxLength30, passwordsMatch, email, password } from '../formValidation';

const getComponent = component => component === "input" ? Input : Textarea;

const parse = (type, component) => type === "number" || component === "select" ? 
  value => value !== '' ? Number(value) : value : undefined;

const getValidation = (type, component) => component === "input" && type === "password" ? [required, password, passwordsMatch] 
  : component === "input" && type === "email" ? [email, required] : [required];

export default ({ field: { id, title, type, component }, index }) => (
  <Field 
    key={index}
    name={id} 
    label={title} 
    id={id}
    parse={parse(type, component)}
    component={getComponent(component)}
    validate={getValidation(type, component)} 
    type={type}
  />
);