const request = require('supertest');
const {loginAsAdmin} = require('./helpers');
const server = require('../server');

const endPoint = '/api/reviews';

describe('Reviews', () => {
	let token;

	beforeAll(async (done) => {
		token = await loginAsAdmin(server);
		done();
	});

	afterAll(() => {
		server.close();
	});

	it('should create a new review', (done) => {
		request(server)
			.post(endPoint)
			.send({
				text: 'masterpiece',
				game_id: 1,
				rating: 4,
			})
			.set('Authorization', `Bearer ${token}`)
			.expect(201, {success: 'Review was added'}, done);
	});

	it('should not create review and return rating error message', (done) => {
		request(server)
			.post(endPoint)
			.send({
				text: 'masterpiece',
				game_id: 1,
				rating: 6,
			})
			.set('Authorization', `Bearer ${token}`)
			.expect(400, {error: 'Rating must be between 1 and 5'}, done);
	});
});
