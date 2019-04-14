import { connect } from "react-redux";
import { popularProductSelector } from "../selectors/products";
import Main from "../components/main";

const mapStateToProps = state => ({
  games: popularProductSelector(state),
  isLoading: state.products.isLoading
});

export default connect(mapStateToProps)(Main);
