import {connect} from 'react-redux';
import {getOrderKeys} from '../thunks/keys';
import OrderKeys from '../components/orderKeys';

const mapStateToProps = ({keys: {orderKeys, isOrderKeysLoading}}) => ({
	keys: orderKeys,
	isLoading: isOrderKeysLoading
});

const mapDispatchToProps = {
	getOrderKeys
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(OrderKeys);
