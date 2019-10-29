const request = require('supertest');
const server = require('../server');
const {loginAsAdmin, expectFieldRequiredError, expectTokenNotFoundError} = require('./helpers');

const endPoint = '/api/cart';

describe('Cart', () => {
	let token;

	beforeAll(async (done) => {
		token = await loginAsAdmin(server);
		done();
	});

	afterAll(() => {
		server.close();
	});

	describe('POST', () => {
		it('should add product to cart', (done) => {
			request(server)
				.post(endPoint)
				.send({
					game_id: 1,
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(201, {success: 'Key was added to cart'}, done);
		});

		it('should not add product to cart and return error message', (done) => {
			request(server)
				.post(endPoint)
				.send({
					game_id: 9,
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(404, {error: 'Product does not have unused keys'}, done);
		});

		it('should return error message about missing fields', async (done) => {
			await expectFieldRequiredError(server, endPoint, token);
			done();
		});

		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, endPoint);
			done();
		});
	});

	describe('GET', () => {
		it('should return user shopping cart', async (done) => {
			const {body: {results}} = await request(server)
				.get(endPoint)
				.set('Authorization', `Bearer ${token}`)
				.expect(200);

			expect(results.length).toBeGreaterThanOrEqual(1);
			expect(results).not.toBeUndefined();
			done();
		});

		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, endPoint, 'get');
			done();
		});
	});

	describe('DELETE', () => {
		it('should remove product from cart', (done) => {
			request(server)
				.delete(endPoint)
				.send({
					game_id: 1,
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(200, {success: 'Key was removed from cart'}, done);
		});

		it('should return key not found error message', (done) => {
			request(server)
				.delete(endPoint)
				.send({
					game_id: 9,
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(404, {error: 'Key was not found in cart'}, done);
		});

		it('should return error message about missing fields', async (done) => {
			await expectFieldRequiredError(server, endPoint, token, 'delete');
			done();
		});

		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, endPoint, 'delete');
			done();
		});
	});
});
