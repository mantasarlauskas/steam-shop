import { connect } from "react-redux";
import { setMinPrice, setMaxPrice } from "../actions/filter";
import Range from "../components/range";

const mapStateToProps = ({
  filter: { defaultMinPrice, defaultMaxPrice, minPrice, maxPrice }
}) => ({
  defaultMinPrice,
  defaultMaxPrice,
  minPrice,
  maxPrice
});

const mapDispatchToProps = {
  setMinPrice,
  setMaxPrice
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Range);
