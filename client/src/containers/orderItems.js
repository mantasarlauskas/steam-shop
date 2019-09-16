import {connect} from 'react-redux';
import {
	orderProductSelector,
	orderTotalPriceSelector
} from '../selectors/order';
import CartItems from '../components/cartItems';

const mapStateToProps = (state, {id}) => ({
	products: orderProductSelector(state, id),
	totalPrice: orderTotalPriceSelector(state, id),
	isLoading: state.products.isLoading
});

export default connect(mapStateToProps)(CartItems);
