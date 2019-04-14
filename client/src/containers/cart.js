import { cartProductSelector } from "../selectors/products";
import { addOrder } from "../thunks/orders";
import { connect } from "react-redux";
import Cart from "../components/cart";

const mapStateToProps = state => ({
  products: cartProductSelector(state),
  isLoading: state.cart.isLoading
});

const mapDispatchToProps = dispatch => ({
  addOrder: () => dispatch(addOrder())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
