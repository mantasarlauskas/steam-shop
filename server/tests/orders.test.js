const request = require('supertest');
const server = require('../server');
const {loginAsAdmin, addProductToCart, expectTokenNotFoundError} = require('./helpers');

const endPoint = '/api/orders';

describe('Orders', () => {
	let token;

	beforeAll(async (done) => {
		token = await loginAsAdmin(server);
		await addProductToCart(server,1, token);
		done();
	});

	afterAll(() => {
		server.close();
	});

	describe('POST', () => {
		it('should create a new order', (done) => {
			request(server)
				.post(endPoint)
				.set('Authorization', `Bearer ${token}`)
				.expect(201, {success: 'Order was created'}, done);
		});

		it('should return empty shopping cart error message', (done) => {
			request(server)
				.post(endPoint)
				.set('Authorization', `Bearer ${token}`)
				.expect(400, {success: 'Shopping cart is empty'}, done);
		});

		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, endPoint);
			done();
		});
	});

	describe('GET', () => {
		it('should return user order list', (done) => {
			request(server)
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

		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, endPoint, 'get');
			done();
		});
	});
});
