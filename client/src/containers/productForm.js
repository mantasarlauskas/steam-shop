import { connect } from "react-redux";
import ProductForm from "../components/productForm";
import { getProducts } from "../thunks/products";
import { findProductSelector } from "../selectors/products";

const mapStateToProps = (
  state,
  {
    match: {
      params: { id }
    }
  }
) => ({
  product: findProductSelector(state, id),
  id: id && parseInt(id),
  isLoading: state.products.isLoading,
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm);
