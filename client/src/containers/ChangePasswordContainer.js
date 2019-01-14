import {connect} from 'react-redux';
import ChangePassword from '../components/ChangePassword';
import {changePassword} from "../thunks/users";

const mapStateToProps = ({auth: {errorMessage, successMessage}}) => ({
  errorMessage,
  successMessage
});

const mapDispatchToProps = dispatch => ({
  onSubmit: fields => dispatch(changePassword(fields))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
