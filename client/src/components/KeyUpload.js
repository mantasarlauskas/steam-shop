import React from 'react';
import KeyForm from '../containers/KeyForm';
import { keyFields } from '../formFields';

export default () => (
  <div className="app">
    <KeyForm form="keyForm" fields={keyFields} />
  </div>
);