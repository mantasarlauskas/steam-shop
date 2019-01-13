import {connect} from 'react-redux';
import Product from '../components/Product';
import {addProductToCart} from '../thunks/cart';
import {cartProductSelector, findProductSelector} from '../selectors/products';
import {removeProduct} from "../thunks/product";

const mapStateToProps = (state, {match: {params: {id}}}) => ({
  product: findProductSelector(state, id),
  cartCount: cartProductSelector(state).reduce((sum, product) => product.id === parseInt(id) ? sum + 1 : sum, 0),
  id: parseInt(id),
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  addToCart: id => dispatch(addProductToCart(id)),
  onRemove: id => dispatch(removeProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
