import { connect } from 'react-redux';
import Games from '../components/Games';
import {productByPriceSelector, productPaginationSelector} from "../selectors/products";
import {setPage} from "../actions/pagination";
import {resetFilter} from "../actions/filter";
import {changeMaxPrice, changeMinPrice, changeSort} from "../thunks/filter";

const mapStateToProps = state => ({
  products: productPaginationSelector(state),
  pagination: state.pagination,
  productLength: productByPriceSelector(state).length,
  defaultMinPrice: state.filter.defaultMinPrice,
  defaultMaxPrice: state.filter.defaultMaxPrice,
  minPrice: state.filter.minPrice,
  maxPrice: state.filter.maxPrice
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(resetFilter()),
  onMinPriceChange: price => dispatch(changeMinPrice(price)),
  onMaxPriceChange: price => dispatch(changeMaxPrice(price)),
  onPageChange: page => dispatch(setPage(page)),
  onSortChange: sort => dispatch(changeSort(sort))
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);