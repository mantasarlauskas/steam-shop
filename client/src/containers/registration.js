import { connect } from "react-redux";
import { closeRegistration, submitRegistration } from "../thunks/auth";
import Registration from "../components/registration";

const mapStateToProps = ({
  messages: { errorMessage },
  forms: { registrationForm }
}) => ({
  errorMessage,
  isOpen: registrationForm
});

const mapDispatchToProps = {
  submitRegistration,
  closeRegistration
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Registration);
