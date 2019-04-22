import { connect } from "react-redux";
import jwt from "jsonwebtoken";
import { updateUser } from "../thunks/users";
import { resetSuccessMessage } from "../actions/messages";
import EditUser from "../components/editUser";

const mapStateToProps = ({ token, messages: { successMessage } }) => ({
  user: jwt.decode(token),
  successMessage
});

const mapDispatchToProps = {
  updateUser,
  resetSuccessMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
