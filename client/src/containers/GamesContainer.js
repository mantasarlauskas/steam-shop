import {connect} from 'react-redux';
import Games from '../components/Games';
import {productByPriceSelector, productSortSelector} from "../selectors/products";
import {resetFilter, setMaxPrice, setMinPrice, setSort} from "../actions/filter";

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
  onMinPriceChange: price => dispatch(setMinPrice(price)),
  onMaxPriceChange: price => dispatch(setMaxPrice(price)),
  onSortChange: sort => dispatch(setSort(sort))
});

export default connect(mapStateToProps, mapDispatchToProps)(Games);