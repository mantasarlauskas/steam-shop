import { connect } from "react-redux";
import Search from "../components/search";

const mapStateToProps = ({ products: { list, isLoading } }) => ({
  games: list,
  isLoading
});

export default connect(mapStateToProps)(Search);
