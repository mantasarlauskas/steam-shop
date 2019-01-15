import {connect} from 'react-redux';
import {closeRegistration, submitRegistration} from "../thunks/auth";
import {setErrorMessage} from "../actions/auth";
import Form from '../components/Registration';

const mapStateToProps = ({auth: {errorMessage}, forms: {registrationForm}}) => ({
  errorMessage,
  isOpen: registrationForm
});

const mapDispatchToProps = dispatch => ({
  onSubmit: fields => dispatch(submitRegistration(fields)),
  onError: message => dispatch(setErrorMessage(message)),
  closeModal: () => dispatch(closeRegistration())
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
