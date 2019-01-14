import {connect} from 'react-redux';
import EditUser from '../components/EditUser';
import jwt from 'jsonwebtoken';
import {updateUser} from "../thunks/users";

const mapStateToProps = ({token, auth: {successMessage, errorMessage}}) => ({
  user: jwt.decode(token),
  successMessage,
  errorMessage
});

const mapDispatchToProps = dispatch => ({
  onEdit: fields => dispatch(updateUser(fields))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
