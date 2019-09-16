import {connect} from 'react-redux';
import {getOrders} from '../thunks/orders';
import {orderSelector} from '../selectors/order';
import Orders from '../components/orders';

const mapStateToProps = state => ({
	items: orderSelector(state),
	isLoading: state.orders.isLoading
});

const mapDispatchToProps = {
	getItems: getOrders
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Orders);
