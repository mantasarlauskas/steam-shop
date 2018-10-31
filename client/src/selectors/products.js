import { createSelector } from 'reselect';

const productSelector = ({ products: { games } }) => games;
const searchKeywordSelector = ({ search }) => search;

export const productSearchSelector = createSelector(
  [productSelector, searchKeywordSelector],
  (products, keyword) => keyword !== '' ? products.filter(product => product.title.toUpperCase().includes(keyword.toUpperCase())) : null
);
