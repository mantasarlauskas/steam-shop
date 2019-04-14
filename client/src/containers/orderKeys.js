import { connect } from "react-redux";
import { getOrderKeys } from "../thunks/keys";
import OrderKeys from "../components/orderKeys";

const mapStateToProps = ({ keys: { orderKeys } }) => ({
  orderKeys
});

const mapDispatchToProps = dispatch => ({
  onLoad: id => dispatch(getOrderKeys(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderKeys);
