import {createSelector} from 'reselect';

const productSelector = ({products: {list}}) => list;
const minPriceSelector = ({filter: {minPrice}}) => minPrice;
const maxPriceSelector = ({filter: {maxPrice}}) => maxPrice;
const sortSelector = ({filter: {sort}}) => sort;
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

export const productByPriceSelector = createSelector(
	[productSelector, minPriceSelector, maxPriceSelector],
	(products, minPrice, maxPrice) =>
		products.filter(({price}) => price >= minPrice && price <= maxPrice)
);

export const productBySortSelector = createSelector(
	[productByPriceSelector, sortSelector],
	(products, sort) => {
		const newProducts = [...products];
		switch (sort) {
			case 'NAME_DESC':
				return newProducts.sort((a, b) =>
					a.title.toUpperCase() < b.title.toUpperCase()
						? 1
						: b.title.toUpperCase() < a.title.toUpperCase()
						? -1
						: 0
				);
			case 'PRICE_ASC':
				return newProducts.sort((a, b) => a.price - b.price);
			case 'PRICE_DESC':
				return newProducts.sort((a, b) => b.price - a.price);
			default:
				return newProducts.sort((a, b) =>
					a.title.toUpperCase() > b.title.toUpperCase()
						? 1
						: b.title.toUpperCase() > a.title.toUpperCase()
						? -1
						: 0
				);
		}
	}
);
