import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, reset } from 'redux-form';
import Form from '../components/ModalForm';
import {closeLogin, redirectFromLoginToRegistration, submitLogin} from "../thunks/auth";

const mapStateToProps = ({ auth: { errorMessage, successMessage }, forms: { loginForm } }) => ({
  errorMessage,
  successMessage,
  isOpen: loginForm
});

const mapDispatchToProps = dispatch => ({
  onSubmit: fields => dispatch(submitLogin(fields)),
  closeModal: () => dispatch(closeLogin()),
  targetData: () => dispatch(redirectFromLoginToRegistration())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm()
)(Form);
