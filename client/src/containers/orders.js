import { connect } from "react-redux";
import { getOrders } from "../thunks/orders";
import { orderSelector } from "../selectors/order";
import Orders from "../components/orders";

const mapStateToProps = state => ({
  orders: orderSelector(state),
  isLoading: state.orders.isLoading
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Orders);
