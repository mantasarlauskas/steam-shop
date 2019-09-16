import {connect} from 'react-redux';
import {getProducts} from '../thunks/products';
import {addOrder} from '../thunks/orders';
import {cartProductSelector} from '../selectors/cart';
import Cart from '../components/cart';

const mapStateToProps = state => ({
	productCount: cartProductSelector(state).length
});

const mapDispatchToProps = {
	getProducts,
	addOrder
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Cart);
