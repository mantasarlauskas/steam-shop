import { connect } from "react-redux";
import Order from "../components/order";
import { orderProductSelector } from "../selectors/order";
import { getProducts } from "../thunks/products";
import { getOrders } from "../thunks/orders";

const mapStateToProps = (
  state,
  {
    match: {
      params: { id }
    }
  }
) => ({
  products: orderProductSelector(state, id),
  token: state.token,
  id: parseInt(id),
  isProductsLoading: state.products.isLoading,
  isOrdersLoading: state.orders.isLoading,
  orders: state.orders.list
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getProducts()),
  onOrdersFetch: () => dispatch(getOrders())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
