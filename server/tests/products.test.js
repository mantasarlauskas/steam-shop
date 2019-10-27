const request = require('supertest');
const {serverUrl} = require('./helpers');

const endPoint = '/api/products';

describe('Products', () => {
	let responseProducts;

	beforeAll(async (done) => {
		const {body: {products}} = await request(serverUrl).get(endPoint);
		responseProducts = products;
		done();
	});

	it('should return one or more products', () => {
		expect(responseProducts.length).toBeGreaterThanOrEqual(1);
	});


	it('should have products with all required properties', () => {
		responseProducts.forEach(product => {
			expect(product).toHaveProperty('id');
			expect(product).toHaveProperty('title');
			expect(product).toHaveProperty('price');
			expect(product).toHaveProperty('logo');
			expect(product).toHaveProperty('description');
			expect(product).toHaveProperty('timesBought');
			expect(product).toHaveProperty('totalCount');
			expect(product).toHaveProperty('usedCount');
		});
	});
});
