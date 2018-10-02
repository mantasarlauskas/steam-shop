import { connect } from 'react-redux';
import { reset } from 'redux-form';
import Registration from '../components/Registration';
import { resetErrorMessage } from '../actions/auth';
import { hideRegistrationForm } from '../actions/forms';

const mapStateToProps = ({ forms: { registrationForm } }) => ({
  open: registrationForm
});

const mapDispatchToProps = dispatch => ({
  resetFields: () => {
    dispatch(hideRegistrationForm());
    dispatch(resetErrorMessage());
    dispatch(reset('registrationForm'));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
