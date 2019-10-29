const request = require('supertest');
const uniqid = require('uniqid');
const server = require('../server');
const {
	loginWithCredentials,
	loginAsAdmin,
	getUser,
	expectTokenNotFoundError,
	expectFieldRequiredError
} = require('./helpers');

const username = uniqid();

describe('Registration', () => {
	const endPoint = '/api/register';

	afterAll(() => {
		server.close();
	});

	it('should create a new user', done => {
		request(server)
			.post(endPoint)
			.send({
				username,
				email: 'user123@gmail.com',
				password: 'user123123'
			})
			.expect(201, {success: 'Successful registration'}, done);
	});

	it('should return user list with new user', async (done) => {
		const token = await loginAsAdmin(server);
		const {body: {users}} = await request(server).get('/api/users').set('Authorization', `Bearer ${token}`);
		const user = users.find(user => user.username === username);
		expect(user).not.toBeUndefined();
		done();
	});

	it('should not create a new user', function (done) {
		request(server)
			.post(endPoint)
			.send({
				username,
				email: 'user123@gmail.com',
				password: 'user123123'
			})
			.expect(400, {error: 'User already exists'}, done);
	});

	it('should return error message about missing fields', async (done) => {
		await expectFieldRequiredError(server, endPoint);
		done();
	});
});

describe('Login', () => {
	const endPoint = '/api/login';

	afterAll(() => {
		server.close();
	});

	it('should login user and return token', function (done) {
		request(server)
			.post(endPoint)
			.send({
				username,
				password: 'user123123'
			})
			.expect(200)
			.then(({body}) => {
				expect(body).toHaveProperty('token');
				done();
			});
	});

	it('should not login user and return wrong password error message', function (done) {
		request(server)
			.post(endPoint)
			.send({
				username,
				password: 'user'
			})
			.expect(401, {error: 'Wrong password'}, done);
	});

	it('should not login user and return user is banned message', function (done) {
		request(server)
			.post(endPoint)
			.send({
				username: 'rootas13',
				password: 'rootas13'
			})
			.expect(403, {error: 'User is banned'}, done);
	});

	it('should return user does not exist error message', function (done) {
		request(server)
			.post(endPoint)
			.send({
				username: '1',
				password: 'user'
			})
			.expect(401, {error: 'User does not exist'}, done);
	});

	it('should return error message about missing fields', async (done) => {
		await expectFieldRequiredError(server, endPoint);
		done();
	});
});

describe('Password', () => {
	const endPoint = '/api/password';
	let token;

	afterAll(() => {
		server.close();
	});

	beforeAll(async (done) => {
		token = await loginWithCredentials(server, username, 'user123123');
		done();
	});

	it('should change user password', async (done) => {
		const password = 'user123123';
		await request(server)
			.post(endPoint)
			.send({
				currentPassword: 'user123123',
				password
			})
			.set('Authorization', `Bearer ${token}`)
			.expect(200, {success: 'Password changed'});


		const newToken = await loginWithCredentials(server, username, password);
		expect(newToken).not.toBeUndefined();
		done();
	});

	it('should not change user password and return wrong password error', function (done) {
		request(server)
			.post(endPoint)
			.send({
				currentPassword: 'useasr123123',
				password: 'user123123'
			})
			.set('Authorization', `Bearer ${token}`)
			.expect(401, {error: 'Wrong password'}, done);
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
