const request = require('supertest');
const {loginAsAdmin, getProduct, expectTokenNotFoundError, expectFieldRequiredError} = require('./helpers');
const server = require('../server');

const endPoint = '/api/products';

describe('Products', () => {
	let token, newProduct, updatedProduct;

	beforeAll(async (done) => {
		token = await loginAsAdmin(server);
		done();
	});

	afterAll(() => {
		server.close();
	});

	describe('POST', () => {
		it('should create a new product with a review', async (done) => {
			const {body: {success, product}} = await request(server)
				.post(endPoint)
				.send({
					title: 'Game',
					price: 12,
					description: 'Decent game',
					logo: 'image/image'
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(201);
			expect(success).toBe('Product was added');
			expect(product).not.toBeUndefined();
			newProduct = product;
			await request(server)
				.post('/api/reviews')
				.send({
					text: 'Great game',
					game_id: product.id,
					rating: 5,
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(201);
			done();
		});

		it('should have a new product in products list', async (done) => {
			const product = await getProduct(server, token, newProduct.id);
			expect(product).not.toBeUndefined();
			done();
		});


		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, endPoint);
			done();
		});

		it('should return error message about missing fields', async (done) => {
			await expectFieldRequiredError(server, endPoint, token);
			done();
		});
	});

	describe('PUT', () => {
		it('should update product', async (done) => {
			const {body: {success, product}} = await request(server)
				.put(endPoint)
				.send({
					id: newProduct.id,
					title: 'Game1',
					price: 12.65,
					description: 'Decent game',
					logo: 'image/image'
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(200);
			expect(success).toBe('Product was updated');
			expect(product).not.toBeUndefined();
			updatedProduct = product;
			done();
		});

		it('should return product does not exist error message', (done) => {
			request(server)
				.put(endPoint)
				.send({
					id: -1,
					title: 'Game1',
					price: 12.65,
					description: 'Decent game',
					logo: 'image/image'
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(404, {error: 'Product does not exist'}, done);
		});

		it('should have an updated product in products list', async (done) => {
			const key = await getProduct(server, token, updatedProduct.id);
			expect(key).not.toBeUndefined();
			done();
		});

		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, endPoint, 'put');
			done();
		});

		it('should return error message about missing fields', async (done) => {
			await expectFieldRequiredError(server, endPoint, token, 'put');
			done();
		});
	});

	describe('DELETE', () => {
		it('should delete product', (done) => {
			request(server)
				.delete(endPoint)
				.send({
					id: newProduct.id,
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(200, {success: 'Product was deleted'}, done);
		});

		it('should not have deleted product in products list', async (done) => {
			const product = await getProduct(server, token, newProduct.id);
			expect(product).toBeUndefined();
			done();
		});

		it('should return product does not exist error message', (done) => {
			request(server)
				.delete(endPoint)
				.send({
					id: -1
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(404, {error: 'Product does not exist'}, done);
		});

		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, endPoint, 'delete');
			done();
		});

		it('should return error message about missing fields', async (done) => {
			await expectFieldRequiredError(server, endPoint, token, 'delete');
			done();
		});
	});

	describe('GET', () => {
		it('should return more than 1 product', async (done) => {
			const {body: {products}} = await request(server)
				.get(endPoint)
				.set('Authorization', `Bearer ${token}`);
			expect(products.length).toBeGreaterThanOrEqual(1);
			done();
		});
	});
});
