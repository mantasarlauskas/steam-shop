import {createSelector} from 'reselect';

const orderItemSelector = ({orders}) => orders;
const productSelector = ({products}) => products;
const idSelector = (state, id) => id;

export const orderIDSelector = createSelector(
  [orderItemSelector],
  orders => [...new Set(orders.map(order => order.order_id))]
);

export const orderSelector = createSelector(
  [orderIDSelector, orderItemSelector],
  (orderIDs, orders) => orderIDs.map(id => ({
    id,
    createdAt: orders.find(order => order.order_id === id).Order.createdAt
  }))
);

export const orderByIDSelector = createSelector(
  [orderItemSelector, idSelector],
  (orders, id) => orders.filter(order => order.order_id === parseInt(id))
);

export const orderProductSelector = createSelector(
  [productSelector, orderByIDSelector],
  (products, orders) => orders.map(item => ({
    ...products.find(product => product.id === item.game_id),
    cartCount: item.count
  }))
);
