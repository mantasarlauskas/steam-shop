import {connect} from 'react-redux';
import {addProductToCart, removeProductFromCart} from '../thunks/cart';
import CartProduct from '../components/cartProduct';

const mapDispatchToProps = {
	addProductToCart,
	removeProductFromCart
};

export default connect(
	null,
	mapDispatchToProps
)(CartProduct);
