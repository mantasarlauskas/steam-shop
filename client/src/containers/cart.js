import { connect } from "react-redux";
import { getProducts } from "../thunks/products";
import { cartProductSelector } from "../selectors/products";
import { addOrder } from "../thunks/orders";
import Cart from "../components/cart";

const mapStateToProps = state => ({
  products: cartProductSelector(state),
  isLoading: state.cart.isLoading
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getProducts()),
  addOrder: () => dispatch(addOrder())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
