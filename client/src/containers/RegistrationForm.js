import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, reset } from 'redux-form';
import Form from '../components/ModalForm';
import {closeRegistration, submitRegistration} from "../thunks/auth";

const mapStateToProps = ({ auth: { errorMessage }, forms: { registrationForm } }) => ({
  errorMessage,
  isOpen: registrationForm
});

const mapDispatchToProps = dispatch => ({
  onSubmit: fields => dispatch(submitRegistration(fields)),
  closeModal: () => dispatch(closeRegistration())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm()
)(Form);
