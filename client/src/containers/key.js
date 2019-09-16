import {connect} from 'react-redux';
import {removeKey} from '../thunks/keys';
import Key from '../components/key';

const mapDispatchToProps = {
	removeKey
};

export default connect(
	null,
	mapDispatchToProps
)(Key);
