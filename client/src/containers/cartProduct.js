import { connect } from "react-redux";
import { addProductToCart, removeProductFromCart } from "../thunks/cart";
import CartProduct from "../components/cartProduct";

const mapDispatchToProps = dispatch => ({
  addToCart: id => dispatch(addProductToCart(id)),
  removeFromCart: id => dispatch(removeProductFromCart(id))
});

export default connect(
  null,
  mapDispatchToProps
)(CartProduct);
