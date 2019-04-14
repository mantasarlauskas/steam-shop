import { connect } from "react-redux";
import Users from "../components/users";
import { banUser, getUsers, unbanUser } from "../thunks/users";

const mapStateToProps = ({ auth: { users } }) => ({
  users
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getUsers()),
  onUserBan: id => dispatch(banUser(id)),
  onUserUnban: id => dispatch(unbanUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
