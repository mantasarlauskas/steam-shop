import { createSelector } from 'reselect';

const cartSelector = ({ cart }) => cart;

export const cartCountSelector = createSelector(
  [cartSelector],
  cart => cart.reduce((accumulator, item) => accumulator + item.count, 0)
);
