const request = require('supertest');
const {loginAsAdmin, serverUrl} = require('./helpers');

const endPoint = '/api/users';

describe('Users', () => {
	let token;

	beforeAll((done) => {
		loginAsAdmin().then(adminToken => {
			token = adminToken;
			done();
		})
	});

	it('should change user email', (done) => {
		request(serverUrl)
			.post(endPoint)
			.send({
				email: 'root@root123123.com',
			})
			.set('Authorization', `Bearer ${token}`)
			.expect(200, {success: 'Email was changed'}, done);
	});

	it('should return wrong email format message', (done) => {
		request(serverUrl)
			.post(endPoint)
			.send({
				email: 'root',
			})
			.set('Authorization', `Bearer ${token}`)
			.expect(400, {error: 'Wrong email format'}, done);
	});
});
