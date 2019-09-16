import {createSelector} from 'reselect';

const cartSelector = ({cart: {list}}) => list;
const productSelector = ({products: {list}}) => list;

export const cartCountSelector = createSelector(
	[cartSelector],
	cart => cart.reduce((accumulator, item) => accumulator + item.count, 0)
);

export const cartProductSelector = createSelector(
	[productSelector, cartSelector],
	(products, cart) =>
		cart.map(item => ({
			...products.find(product => product.id === item.game_id),
			cartCount: item.count
		}))
);

export const cartTotalPriceSelector = createSelector(
	[cartProductSelector],
	products =>
		products.reduce(
			(sum, {cartCount, price}) =>
				parseFloat((sum + cartCount * price).toFixed(2)),
			0
		)
);
