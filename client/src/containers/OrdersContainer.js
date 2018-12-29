import {connect} from 'react-redux';
import Orders from '../components/Orders';
import {getOrders} from "../thunks/order";
import {orderSelector} from "../selectors/order";

const mapStateToProps = (state) => ({
  orders: orderSelector(state)
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(getOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
