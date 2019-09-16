import {connect} from 'react-redux';
import {resetMessages} from '../thunks/messages';
import {changePassword} from '../thunks/users';
import ChangePassword from '../components/changePassword';

const mapStateToProps = ({messages: {errorMessage, successMessage}}) => ({
	errorMessage,
	successMessage
});

const mapDispatchToProps = {
	changePassword,
	resetMessages
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChangePassword);
