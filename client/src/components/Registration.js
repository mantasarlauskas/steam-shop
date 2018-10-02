import React from 'react';
import RegistrationForm from '../containers/RegistrationForm';
import { registrationFields } from '../formFields';
import Modal from 'react-responsive-modal';

export default ({ resetFields, open }) => (
  <Modal
    open={open}
    onClose={resetFields}
  >
    <h5>Registracija</h5>
    <RegistrationForm form="registrationForm" fields={registrationFields} hideButton={true} />
  </Modal>
);