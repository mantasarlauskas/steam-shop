import { createSelector } from "reselect";
const productSelector = ({ products: { list } }) => list;
const cartSelector = ({ cart: { list } }) => list;
const propsSelector = (state, props) => props;

export const popularProductSelector = createSelector(
  [productSelector],
  products => {
    let newProducts = [...products];
    return newProducts
      .sort((a, b) => b.timesBought - a.timesBought)
      .slice(0, 6);
  }
);

export const findProductSelector = createSelector(
  [productSelector, propsSelector],
  (products, id) => products.find(product => product.id === parseInt(id))
);

/* Tinkamas */
export const cartProductSelector = createSelector(
  [productSelector, cartSelector],
  (products, cart) =>
    cart.map(item => ({
      ...products.find(product => product.id === item.game_id),
      cartCount: item.count
    }))
);
