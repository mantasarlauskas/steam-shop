import { connect } from "react-redux";
import { resetErrorMessage } from "../actions/messages";
import { hideRegistrationForm } from "../actions/forms";
import { registerUser } from "../thunks/users";
import Registration from "../components/registration";

const mapStateToProps = ({ messages: { errorMessage } }) => ({
  errorMessage
});

const mapDispatchToProps = {
  registerUser,
  hideRegistrationForm,
  resetErrorMessage
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
