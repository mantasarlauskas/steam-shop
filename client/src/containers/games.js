import { connect } from "react-redux";
import { getProducts } from "../thunks/products";
import Games from "../components/games";

const mapStateToProps = ({ products: { list, isLoading } }) => ({
  games: list,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getProducts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Games);
