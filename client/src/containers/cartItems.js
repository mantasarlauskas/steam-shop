import { connect } from "react-redux";
import {
  cartProductSelector,
  cartTotalPriceSelector
} from "../selectors/products";
import CartItems from "../components/cartItems";

const mapStateToProps = state => ({
  products: cartProductSelector(state),
  totalPrice: cartTotalPriceSelector(state),
  isLoading: state.cart.isLoading
});

export default connect(mapStateToProps)(CartItems);
