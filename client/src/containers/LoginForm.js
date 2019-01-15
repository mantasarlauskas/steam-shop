import {connect} from 'react-redux';
import Form from '../components/Login';
import {closeLogin, redirectFromLoginToRegistration, submitLogin} from "../thunks/auth";
import {setErrorMessage} from "../actions/auth";

const mapStateToProps = ({auth: {errorMessage, successMessage}, forms: {loginForm}}) => ({
  errorMessage,
  successMessage,
  isOpen: loginForm
});

const mapDispatchToProps = dispatch => ({
  onSubmit: fields => dispatch(submitLogin(fields)),
  onError: message => dispatch(setErrorMessage(message)),
  closeModal: () => dispatch(closeLogin()),
  targetData: () => dispatch(redirectFromLoginToRegistration())
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
