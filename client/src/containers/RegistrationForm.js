import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, reset } from 'redux-form';
import Form from '../components/ModalForm';
import { registerUser, resetErrorMessage } from '../actions/auth';
import { hideRegistrationForm } from '../actions/forms';

const mapStateToProps = ({ auth: { errorMessage }, forms: { registrationForm } }) => ({
  errorMessage,
  isOpen: registrationForm
});

const mapDispatchToProps = dispatch => ({
  onSubmit: fields => {
    dispatch(resetErrorMessage());
    dispatch(registerUser({ username: fields.username, email: fields.email, password: fields.password1 }));
  },
  closeModal: () => {
    dispatch(resetErrorMessage());
    dispatch(hideRegistrationForm());
    dispatch(reset('registrationForm')); 
  }
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm()
)(Form);
