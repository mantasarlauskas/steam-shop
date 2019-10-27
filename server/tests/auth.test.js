const request = require('supertest');
const uniqid = require('uniqid');
const {serverUrl} = require('./helpers');

const username = uniqid();

describe('Registration', () => {
	const endPoint = '/api/register';

	it('should create a new user', function (done) {
		request(serverUrl)
			.post(endPoint)
			.send({
				username,
				email: 'user123@gmail.com',
				password: 'user123123'
			})
			.expect(201, {success: 'Successful registration'}, done);
	});

	it('should not create a new user', function (done) {
		request(serverUrl)
			.post(endPoint)
			.send({
				username,
				email: 'user123@gmail.com',
				password: 'user123123'
			})
			.expect(400, {error: 'User already exists'}, done);
	});

	it('should return error message about missing fields', function (done) {
		request(serverUrl)
			.post(endPoint)
			.send({
				username
			})
			.expect(400, {error: 'username, email and password fields are required'}, done);
	});
});

describe('Login', () => {
	const endPoint = '/api/login';

	it('should login user and return token', function (done) {
		request(serverUrl)
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
		request(serverUrl)
			.post(endPoint)
			.send({
				username,
				password: 'user'
			})
			.expect(401, {error: 'Wrong password'}, done);
	});

	it('should return user does not exist error message', function (done) {
		request(serverUrl)
			.post(endPoint)
			.send({
				username: '1',
				password: 'user'
			})
			.expect(401, {error: 'User does not exist'}, done);
	});
});
