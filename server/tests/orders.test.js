const request = require('supertest');
const {loginAsAdmin, addProductToCart, serverUrl} = require('./helpers');

const endPoint = '/api/orders';

describe('Orders', () => {
	let token;

	beforeAll(async (done) => {
		token = await loginAsAdmin();
		await addProductToCart(1, token);
		done();
	});

	it('should create a new order', (done) => {
		request(serverUrl)
			.post(endPoint)
			.set('Authorization', `Bearer ${token}`)
			.expect(201, {success: 'Order was created'}, done);
	});

	it('should return empty shopping cart error message', (done) => {
		request(serverUrl)
			.post(endPoint)
			.set('Authorization', `Bearer ${token}`)
			.expect(400, {success: 'Shopping cart is empty'}, done);
	});

	it('should return user order list', (done) => {
		request(serverUrl)
			.get(endPoint)
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.then(({ body: { orders }}) => {
				expect(orders.length).toBeGreaterThanOrEqual(1);
				orders.forEach(order => {
					expect(order).toHaveProperty('game_id');
					expect(order).toHaveProperty('order_id');
					expect(order).toHaveProperty('count');
				});
				done();
			});
	});
});
