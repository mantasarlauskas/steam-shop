import {connect} from 'react-redux';
import {getUsers} from '../thunks/users';
import Users from '../components/users';

const mapStateToProps = ({users: {list, isLoading}}) => ({
	users: list,
	isLoading
});

const mapDispatchToProps = {
	getItems: getUsers
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Users);
