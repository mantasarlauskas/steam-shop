import { connect } from "react-redux";
import Login from "../components/login";
import {
  closeLogin,
  redirectFromLoginToRegistration,
  submitLogin
} from "../thunks/auth";

const mapStateToProps = ({
  messages: { errorMessage, successMessage },
  forms: { loginForm }
}) => ({
  errorMessage,
  successMessage,
  isOpen: loginForm
});

const mapDispatchToProps = {
  submitLogin,
  closeLogin,
  redirectFromLoginToRegistration
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
