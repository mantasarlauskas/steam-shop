import {connect} from 'react-redux';
import {getKeys} from '../thunks/keys';
import Keys from '../components/keys';

const mapStateToProps = ({keys: {list, isLoading}}) => ({
	keys: list,
	isLoading
});

const mapDispatchToProps = {
	getItems: getKeys
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Keys);
