import { connect } from "react-redux";
import { closeRegistration, submitRegistration } from "../thunks/auth";
import { setErrorMessage } from "../actions/messages";
import Form from "../components/Registration";

const mapStateToProps = ({
  messages: { errorMessage },
  forms: { registrationForm }
}) => ({
  errorMessage,
  isOpen: registrationForm
});

const mapDispatchToProps = dispatch => ({
  onSubmit: fields => dispatch(submitRegistration(fields)),
  onError: message => dispatch(setErrorMessage(message)),
  closeModal: () => dispatch(closeRegistration())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
