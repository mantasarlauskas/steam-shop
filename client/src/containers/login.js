import { connect } from "react-redux";
import { resetMessages } from "../thunks/messages";
import { loginUser } from "../thunks/users";
import { hideLoginForm, showRegistrationForm } from "../actions/forms";
import Login from "../components/login";

const mapStateToProps = ({ messages: { errorMessage, successMessage } }) => ({
  errorMessage,
  successMessage
});

const mapDispatchToProps = {
  loginUser,
  hideLoginForm,
  showRegistrationForm,
  resetMessages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
