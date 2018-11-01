import { createSelector } from 'reselect';

const productSelector = ({ products: { games } }) => games;
const searchKeywordSelector = ({ search }) => search;
const cartSelector = ({ cart }) => cart;
const propsSelector = (state, props) => props;

export const productSearchSelector = createSelector(
  [productSelector, searchKeywordSelector],
  (products, keyword) => keyword !== '' ? products.filter(product => product.title.toUpperCase().includes(keyword.toUpperCase())) : null
);

export const findProductSelector = createSelector(
  [productSelector, propsSelector],
  (products, id) => products.find(product => product.id === parseInt(id))
);

export const cartProductSelector = createSelector(
  [productSelector, cartSelector],
  (products, cart) => {
    const arr = [];
    cart.forEach(item => {
      let i = 0;
      while(i < item.count) {
        arr.push(products.find(product => product.id === item.id))
        i++;
      }
    });
    return arr;
  }
);
