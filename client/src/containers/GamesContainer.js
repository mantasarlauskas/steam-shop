import { connect } from 'react-redux';
import Games from '../components/Games';
import {productByPriceSelector, productSortSelector} from "../selectors/products";
import {resetFilter} from "../actions/filter";
import {changeMaxPrice, changeMinPrice, changeSort} from "../thunks/filter";

const mapStateToProps = state => ({
  games: productSortSelector(state),
  gamesLength: productByPriceSelector(state).length,
  defaultMinPrice: state.filter.defaultMinPrice,
  defaultMaxPrice: state.filter.defaultMaxPrice,
  minPrice: state.filter.minPrice,
  maxPrice: state.filter.maxPrice
});

const mapDispatchToProps = dispatch => ({
  onLoad: () => dispatch(resetFilter()),
  onMinPriceChange: price => dispatch(changeMinPrice(price)),
  onMaxPriceChange: price => dispatch(changeMaxPrice(price)),
  onSortChange: sort => dispatch(changeSort(sort))
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);