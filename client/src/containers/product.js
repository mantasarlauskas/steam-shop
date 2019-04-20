import { connect } from "react-redux";
import { addProductToCart } from "../thunks/cart";
import { findProductSelector } from "../selectors/products";
import { productRatingSelector } from "../selectors/reviews";
import { onProductLoad, removeProduct } from "../thunks/products";
import Product from "../components/product";

const mapStateToProps = (
  state,
  {
    match: {
      params: { id }
    }
  }
) => ({
  product: findProductSelector(state, id),
  id: parseInt(id),
  token: state.token,
  rating: productRatingSelector(state),
  isLoading: state.products.isLoading
});

const mapDispatchToProps = {
  addProductToCart,
  onProductLoad,
  removeProduct
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
