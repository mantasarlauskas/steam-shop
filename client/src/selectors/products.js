import {createSelector} from 'reselect';

const productSelector = ({products}) => products;
const searchKeywordSelector = ({search}) => search;
const cartSelector = ({cart}) => cart;
const propsSelector = (state, props) => props;
const paginationSelector = state => state.pagination;

export const productPaginationSelector = createSelector(
  [productSelector, paginationSelector],
  (products, {currentPage, itemsPerPage}) => products.filter((product, index) => index >= currentPage * itemsPerPage &&
    index < currentPage * itemsPerPage + itemsPerPage)
);

export const productSearchSelector = createSelector(
  [productSelector, searchKeywordSelector],
  (products, keyword) => keyword !== '' ?
    products.filter(product => product.title.toUpperCase().includes(keyword.toUpperCase())) :
    null
);

export const findProductSelector = createSelector(
  [productSelector, propsSelector],
  (products, id) => products.find(product => product.id === parseInt(id))
);

export const cartProductSelector = createSelector(
  [productSelector, cartSelector],
  (products, cart) => cart.map(item => ({
    ...products.find(product => product.id === item.game_id),
    cartCount: item.count
  }))
);
