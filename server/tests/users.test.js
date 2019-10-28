const request = require('supertest');
const {loginAsAdmin, getUsers} = require('./helpers');
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
		const users = await getUsers(server, token);
		const currentUser = jwt.decode(token);
		const updatedUser = users.find(({id, email}) => currentUser.id === id && email === newEmail);
		expect(updatedUser).not.toBeUndefined();
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
		const users = await getUsers(server, token);
		const user = users.find(({id}) => id === userToBanId);
		expect(user.isBanned).toBe(true);
		done();
	});

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
		const users = await getUsers(server, token);
		const user = users.find(({id}) => id === userToBanId);
		expect(user.isBanned).toBe(false);
		done();
	});
});
