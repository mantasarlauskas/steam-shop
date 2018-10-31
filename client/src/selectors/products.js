import { createSelector } from 'reselect';

const productSelector = ({ products: { games } }) => games;
const searchKeywordSelector = ({ search }) => search;

export const productSearchSelector = createSelector(
  [productSelector, searchKeywordSelector],
  (products, keyword) => products.filter(product => keyword !== '' && product.title.toUpperCase().includes(keyword.toUpperCase()))
);
