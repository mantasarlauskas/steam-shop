import React from 'react';
import LoginForm from '../containers/LoginForm';
import { loginFields } from '../formFields';
import Modal from 'react-responsive-modal';

export default ({ resetFields, open, showRegistration }) => (
  <Modal
    open={open}
    onClose={resetFields}
  >
    <h5>Prisijungimas</h5>
    <LoginForm form="loginForm" fields={loginFields} hideButton={true} additionalText="Registracija" dataTarget={showRegistration} />
  </Modal>
);