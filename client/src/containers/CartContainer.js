import { connect } from 'react-redux';
import Cart from '../components/Cart';
import { cartProductSelector } from '../selectors/products';

const mapStateToProps = state => ({
  products: cartProductSelector(state)
});


export default connect(mapStateToProps)(Cart);
