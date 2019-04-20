import { connect } from "react-redux";
import { productBySortSelector } from "../selectors/products";
import { onProductsLoad } from "../thunks/products";
import Games from "../components/games";

const mapStateToProps = state => ({
  games: productBySortSelector(state),
  isLoading: state.products.isLoading
});

const mapDispatchToProps = {
  getItems: onProductsLoad
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);
