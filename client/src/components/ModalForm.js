import React from 'react';
import Field from './Field';
import Modal from 'react-responsive-modal';

export default ({ handleSubmit, fields, additionalText, targetData, errorMessage, successMessage, closeModal, isOpen, title }) => (
  <Modal open={isOpen} onClose={closeModal}>
    <h5>{ title }</h5>
    <form className="form clearfix" onSubmit={handleSubmit} noValidate>
        { errorMessage && <div className="alert alert-danger py-1">{ errorMessage }</div> }
        { successMessage && <div className="alert alert-success py-1">{ successMessage }</div> }
        { fields.map((field, index) => <Field key={index} field={field} index={index} />) }
        { additionalText && 
            <div className="btn-link" onClick={targetData}>{ additionalText }</div> 
        }
        <button type="submit" className="btn btn-primary">Patvirtinti</button>
        <button type="button" className="btn btn-secondary" onClick={closeModal}>Uždaryti</button>
    </form>
  </Modal>
);