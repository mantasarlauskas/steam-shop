import { connect } from "react-redux";
import { banUser, unbanUser } from "../thunks/users";
import User from "../components/user";

const mapDispatchToProps = {
  banUser,
  unbanUser
};

export default connect(
  null,
  mapDispatchToProps
)(User);
