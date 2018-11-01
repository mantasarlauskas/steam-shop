import { connect } from 'react-redux';
import Product from '../components/Product';
import { addProductToCart } from '../actions/cart';
import { findProductSelector } from '../selectors/products';

const mapStateToProps = (state, { match: { params: { id } } }) => ({
  product: findProductSelector(state, id)
});

const mapDispatchToProps = dispatch => ({
  addToCart: id => dispatch(addProductToCart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
