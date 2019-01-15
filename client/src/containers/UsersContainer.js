import {connect} from 'react-redux';
import Users from '../components/Users';
import {banUser, getUsers, unbanUser} from "../thunks/users";

const mapStateToProps = ({auth: {users}}) => ({
  users
});

const mapDispatchToProps = dispatch => ({
  onUsersLoad: () => dispatch(getUsers()),
  onUserBan: id => dispatch(banUser(id)),
  onUserUnban: id => dispatch(unbanUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);