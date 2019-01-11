import {connect} from 'react-redux';
import Product from '../components/Product';
import {addProductToCart} from '../thunks/cart';
import {findProductSelector} from '../selectors/products';

const mapStateToProps = (state, {match: {params: {id}}}) => ({
  product: findProductSelector(state, id),
  id: parseInt(id),
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  addToCart: id => dispatch(addProductToCart(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
