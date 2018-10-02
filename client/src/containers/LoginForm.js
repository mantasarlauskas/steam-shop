import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm } from 'redux-form';
import Form from '../components/Form';
import { loginUser, resetErrorMessage } from '../actions/auth';

const mapStateToProps = ({ auth: { errorMessage, successMessage } }) => ({
  errorMessage,
  successMessage
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (fields) => {
    dispatch(resetErrorMessage());
    dispatch(loginUser(fields));  
  }
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm()
)(Form);
