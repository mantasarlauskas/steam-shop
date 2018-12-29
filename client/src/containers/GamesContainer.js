import { connect } from 'react-redux';
import Games from '../components/Games';
import {productPaginationSelector} from "../selectors/products";
import {setPage} from "../actions/pagination";

const mapStateToProps = state => ({
  products: productPaginationSelector(state),
  pagination: state.pagination,
  productLength: state.products.length
});

const mapDispatchToProps = dispatch => ({
  onPageChange: page => dispatch(setPage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);