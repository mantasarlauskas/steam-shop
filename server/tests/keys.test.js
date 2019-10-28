const request = require('supertest');
const {loginAsAdmin, getKey, expectTokenNotFoundError, expectFieldRequiredError} = require('./helpers');
const server = require('../server');

const endPoint = '/api/keys';

describe('Keys', () => {
	let token, newKey, updatedKey;

	beforeAll(async (done) => {
		token = await loginAsAdmin(server);
		done();
	});

	describe('POST', () => {
		it('should create a new key', async (done) => {
			const {body: {success, key}} = await request(server)
				.post(endPoint)
				.send({
					game_id: 1,
					steam_key: '123-4asdsad-213123'
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(201);
			expect(success).toBe('Key was added');
			expect(key).not.toBeUndefined();
			newKey = key;
			done();
		});

		it('should have a new key in keys list', async (done) => {
			const key = await getKey(server, token, newKey.id);
			expect(key).not.toBeUndefined();
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
		it('should update key', async (done) => {
			const {body: {success, key}} = await request(server)
				.put(endPoint)
				.send({
					id: newKey.id,
					game_id: 1,
					steam_key: '1234asdsad-213123'
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(200);
			expect(success).toBe('Key was updated');
			expect(key).not.toBeUndefined();
			updatedKey = key;
			done();
		});

		it('should return key does not exist error message', (done) => {
			request(server)
				.put(endPoint)
				.send({
					id: -1,
					game_id: 1,
					steam_key: '1234asdsad-213123'
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(404, {error: 'Key does not exist'}, done);
		});

		it('should have an updated key in keys list', async (done) => {
			const key = await getKey(server, token, updatedKey.id);
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
		it('should delete key', (done) => {
			request(server)
				.delete(endPoint)
				.send({
					id: newKey.id,
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(200, {success: 'Key was deleted'}, done);
		});

		it('should not have deleted key in keys list', async (done) => {
			const key = await getKey(server, token, updatedKey.id);
			expect(key).toBeUndefined();
			done();
		});

		it('should return key does not exist error message', (done) => {
			request(server)
				.delete(endPoint)
				.send({
					id: -1
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(404, {error: 'Key does not exist'}, done);
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
		it('should return more than 1 key', async (done) => {
			const {body: {keys}} = await request(server)
				.get(endPoint)
				.set('Authorization', `Bearer ${token}`);
			expect(keys.length).toBeGreaterThanOrEqual(1);
			done();
		});

		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, endPoint, 'get');
			done();
		});

		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, `${endPoint}/1`, 'get');
			done();
		});
	});
});
