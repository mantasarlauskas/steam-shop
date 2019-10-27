const request = require('supertest');

const serverUrl = 'http://localhost:8080';

const loginAsAdmin = () => {
	return request(serverUrl)
		.post('/api/login')
		.send({
			username: 'rootas',
			password: 'rootas'
		})
		.then(({body}) => body.token);
};

const addProductToCart = (game_id, token) => {
	return request(serverUrl)
		.post('/api/cart')
		.send({
			game_id,
		})
		.set('Authorization', `Bearer ${token}`);
};

module.exports = {
	serverUrl,
	loginAsAdmin,
	addProductToCart
};
