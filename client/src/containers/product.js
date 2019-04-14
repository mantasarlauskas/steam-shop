import { connect } from "react-redux";
import { addProductToCart } from "../thunks/cart";
import {
  cartProductSelector,
  findProductSelector
} from "../selectors/products";
import { removeProduct } from "../thunks/products";
import { getReviews } from "../thunks/reviews";
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
  cartCount: cartProductSelector(state).reduce(
    (sum, product) => (product.id === parseInt(id) ? sum + 1 : sum),
    0
  ),
  id: parseInt(id),
  token: state.token,
  reviews: state.reviews.list,
  isProductsLoading: state.products.isLoading,
  isReviewsLoading: state.reviews.isLoading
});

const mapDispatchToProps = dispatch => ({
  addToCart: id => dispatch(addProductToCart(id)),
  onRemove: id => dispatch(removeProduct(id)),
  onLoad: id => dispatch(getReviews(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
