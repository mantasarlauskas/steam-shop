import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, reset } from 'redux-form';
import Form from '../components/ModalForm';
import { loginUser, resetErrorMessage, resetSuccessMessage } from '../actions/auth';
import { hideLoginForm, showRegistrationForm } from '../actions/forms';

const mapStateToProps = ({ auth: { errorMessage, successMessage }, forms: { loginForm } }) => ({
  errorMessage,
  successMessage,
  isOpen: loginForm
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (fields) => {
    dispatch(resetErrorMessage());
    dispatch(loginUser(fields));  
  },
  closeModal: () => {
    dispatch(resetSuccessMessage());
    dispatch(resetErrorMessage());
    dispatch(hideLoginForm());
    dispatch(reset('loginForm'));
  },
  targetData: () => {
    dispatch(hideLoginForm());
    dispatch(showRegistrationForm());
  }
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm()
)(Form);
