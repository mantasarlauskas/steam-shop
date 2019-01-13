import {connect} from 'react-redux';
import Order from '../components/Order';
import {orderProductSelector} from "../selectors/order";
import {getOrders} from "../thunks/order";

const mapStateToProps = (state, {match: {params: {id}}}) => ({
  products: orderProductSelector(state, id),
  id
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
