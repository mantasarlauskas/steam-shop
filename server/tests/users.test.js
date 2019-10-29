const request = require('supertest');
const {loginAsAdmin, getUser, expectFieldRequiredError, expectTokenNotFoundError} = require('./helpers');
const jwt = require('jsonwebtoken');
const server = require('../server');

const endPoint = '/api/users';
const newEmail = 'root@root123123.com';
const userToBanId = 13;

describe('Users', () => {
	let token;

	beforeAll(async (done) => {
		token = await loginAsAdmin(server);
		done();
	});

	afterAll(() => {
		server.close();
	});

	describe('Email change', () => {
		it('should change user email', (done) => {
			request(server)
				.post(endPoint)
				.send({
					email: newEmail,
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(200, {success: 'Email was changed'}, done);
		});

		it('should return users list with changed email', async (done) => {
			const user = await getUser(server, jwt.decode(token).id, token);
			expect(user).not.toBeUndefined();
			expect(user.email).toBe(newEmail);
			done();
		});

		it('should return wrong email format message', (done) => {
			request(server)
				.post(endPoint)
				.send({
					email: 'root',
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(400, {error: 'Wrong email format'}, done);
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

	describe('Ban user', () => {
		it('should ban user', (done) => {
			request(server)
				.delete(endPoint)
				.send({
					id: userToBanId,
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(200, {success: 'Successfully banned'}, done);
		});

		it(`should return users list with user no.${userToBanId} banned`, async (done) => {
			const user = await getUser(server, userToBanId, token);
			expect(user.isBanned).toBe(true);
			done();
		});

		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, endPoint, 'delete');
			done();
		});
	});

	describe('Unban user', () => {
		it('should unban user', (done) => {
			request(server)
				.put(endPoint)
				.send({
					id: userToBanId,
				})
				.set('Authorization', `Bearer ${token}`)
				.expect(200, {success: 'Successfully unbanned'}, done);
		});

		it(`should return users list with user no.${userToBanId} unbanned`, async (done) => {
			const user = await getUser(server, userToBanId, token);
			expect(user.isBanned).toBe(false);
			done();
		});

		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, endPoint, 'put');
			done();
		});
	});


	describe('GET', () => {
		it('should return user list', async (done) => {
			const {body: {users}} = await request(server)
				.get(endPoint)
				.set('Authorization', `Bearer ${token}`)
				.expect(200);

			expect(users).not.toBeUndefined();
			expect(users.length).toBeGreaterThanOrEqual(1);
			done();
		});

		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, endPoint, 'get');
			done();
		});

		it('should return user does not exist error', (done) => {
			request(server)
				.get(`${endPoint}/-1`)
				.set('Authorization', `Bearer ${token}`)
				.expect(404, {error: 'User does not exist'}, done);
		});

		it('should return error message about missing token', async (done) => {
			await expectTokenNotFoundError(server, `${endPoint}/1`, 'get');
			done();
		});
	});
});
