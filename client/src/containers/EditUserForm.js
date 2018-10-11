import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, reset } from 'redux-form';
import Form from '../components/Form';
import { updateUser, resetErrorMessage, resetSuccessMessage } from '../actions/auth';
import jwt from 'jsonwebtoken';

const mapStateToProps = ({ auth: { successMessage }, token }) => ({
  successMessage,
  token
});

const mapDispatchToProps = dispatch => ({
  onSubmit: (fields, user) => {
    dispatch(resetSuccessMessage());
    dispatch(updateUser({ username: user.username, email: fields.email, password: fields.password1 }));
  }
});

const mergeProps = ({ token, ...stateProps }, { onSubmit, ...dispatchProps }, ownProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    onSubmit: fields => onSubmit(fields, jwt.decode(token))
  }
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  reduxForm()
)(Form);
