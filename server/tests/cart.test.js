const request = require('supertest');
const {loginAsAdmin, serverUrl} = require('./helpers');

const endPoint = '/api/cart';

describe('Cart', () => {
	let token;

	beforeAll(async (done) => {
		token = await loginAsAdmin();
		done();
	});

	it('should add product to cart', (done) => {
		request(serverUrl)
			.post(endPoint)
			.send({
				game_id: 1,
			})
			.set('Authorization', `Bearer ${token}`)
			.expect(201, {success: 'Key was added to cart'}, done);
	});

	it('should not add product to cart and return error message', (done) => {
		request(serverUrl)
			.post(endPoint)
			.send({
				game_id: 9,
			})
			.set('Authorization', `Bearer ${token}`)
			.expect(404, {error: 'Product does not have unused keys'}, done);
	});

	it('should remove product from cart', (done) => {
		request(serverUrl)
			.delete(endPoint)
			.send({
				game_id: 1,
			})
			.set('Authorization', `Bearer ${token}`)
			.expect(200, {success: 'Key was removed from cart'}, done);
	});

	it('should return key not found error message', (done) => {
		request(serverUrl)
			.delete(endPoint)
			.send({
				game_id: 9,
			})
			.set('Authorization', `Bearer ${token}`)
			.expect(404, {error: 'Key was not found in cart'}, done);
	});
});
