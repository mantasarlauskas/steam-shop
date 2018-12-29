import {connect} from 'react-redux';
import Users from '../components/Users';
import {usersPaginationSelector} from "../selectors/users";
import {banUser, getUsers, unbanUser} from "../thunks/users";
import {setPage} from "../actions/pagination";

const mapStateToProps = (state => ({
  pagination: state.pagination,
  users: state.auth.users,
  filteredUsers: usersPaginationSelector(state)
}));

const mapDispatchToProps = dispatch => ({
  onUsersLoad: () => dispatch(getUsers()),
  onPageChange: page => dispatch(setPage(page)),
  onUserBan: id => dispatch(banUser(id)),
  onUserUnban: id => dispatch(unbanUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);