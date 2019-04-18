import { connect } from "react-redux";
import { setSort } from "../actions/filter";
import Sort from "../components/sort";

const mapDispatchToProps = {
  setSort
};

export default connect(
  null,
  mapDispatchToProps
)(Sort);
