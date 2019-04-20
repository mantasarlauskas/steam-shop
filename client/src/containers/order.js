import { connect } from "react-redux";
import { getProducts } from "../thunks/products";
import { orderByIDSelector } from "../selectors/order";
import { getOrders } from "../thunks/orders";
import Order from "../components/order";

const mapStateToProps = (
  state,
  {
    match: {
      params: { id }
    }
  }
) => ({
  id: parseInt(id),
  orders: state.orders.list,
  isLoading: state.orders.isLoading,
  productCount: orderByIDSelector(state, id).length
});

const mapDispatchToProps = {
  getOrders,
  getProducts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order);
