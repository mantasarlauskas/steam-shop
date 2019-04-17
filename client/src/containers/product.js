import { connect } from "react-redux";
import { addProductToCart } from "../thunks/cart";
import { findProductSelector } from "../selectors/products";
import { onProductLoad } from "../thunks/products";
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
  reviews: state.reviews.list,
  isProductsLoading: state.products.isLoading,
  isReviewsLoading: state.reviews.isLoading
});

const mapDispatchToProps = dispatch => ({
  addToCart: id => dispatch(addProductToCart(id)),
  onLoad: id => dispatch(onProductLoad(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
