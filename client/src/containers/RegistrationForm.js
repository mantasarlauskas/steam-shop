import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, reset } from 'redux-form';
import Form from '../components/Form';
import { registerUser, resetErrorMessage, resetSuccessMessage } from '../actions/auth';

const mapStateToProps = ({ auth: { errorMessage } }) => ({
  errorMessage
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (fields) => {
    dispatch(resetErrorMessage());
    dispatch(registerUser({ username: fields.username, email: fields.email, password: fields.password1 }));
  },
  resetFields: () => {
    dispatch(resetSuccessMessage());
    dispatch(resetErrorMessage());
    dispatch(reset('registrationForm')); 
  }
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm()
)(Form);
