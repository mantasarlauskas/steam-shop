import {connect} from 'react-redux';
import Cart from '../components/Cart';
import {cartProductSelector} from '../selectors/products';
import {addProductToCart, removeProductFromCart} from "../thunks/cart";
import {addOrder} from "../thunks/order";

const mapStateToProps = state => ({
  products: cartProductSelector(state)
});

const mapDispatchToProps = dispatch => ({
  addToCart: id => dispatch(addProductToCart(id)),
  removeFromCart: id => dispatch(removeProductFromCart(id)),
  addOrder: () => dispatch(addOrder())
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
