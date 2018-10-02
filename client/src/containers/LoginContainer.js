import { connect } from 'react-redux';
import { reset } from 'redux-form';
import Login from '../components/Login';
import { resetErrorMessage, resetSuccessMessage } from '../actions/auth';
import { showRegistrationForm, hideLoginForm } from '../actions/forms';

const mapStateToProps = ({ forms: { loginForm }}) => ({
  open: loginForm
});

const mapDispatchToProps = dispatch => ({
  showRegistration: () => {
    dispatch(hideLoginForm());
    dispatch(showRegistrationForm());
  },
  resetFields: () => {
    dispatch(resetSuccessMessage());
    dispatch(resetErrorMessage());
    dispatch(hideLoginForm());
    dispatch(reset('loginForm'));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
