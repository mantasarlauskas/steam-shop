const request = require('supertest');

const loginWithCredentials = (server, username, password) => {
	return request(server)
		.post('/api/login')
		.send({
			username,
			password
		})
		.then(({body}) => body.token);
};

const loginAsAdmin = (server) => {
	return loginWithCredentials(server, 'rootas', 'rootas');
};

const addProductToCart = (server, game_id, token) => {
	return request(server)
		.post('/api/cart')
		.send({
			game_id,
		})
		.set('Authorization', `Bearer ${token}`);
};

const getUsers = (server, token) => {
	return request(server)
		.get('/api/users')
		.set('Authorization', `Bearer ${token}`)
		.then(({body: {users}}) => users);
};

const getKey = (server, token, id) => {
	return request(server)
		.get(`/api/keys/${id}`)
		.set('Authorization', `Bearer ${token}`)
		.then(({body: {key}}) => key);
};

const getProduct = (server, token, id) => {
	return request(server)
		.get(`/api/products/${id}`)
		.set('Authorization', `Bearer ${token}`)
		.then(({body: {product}}) => product);
};

const expectTokenNotFoundError = (server, endPoint, method = 'post') => {
	return request(server)[method](endPoint).expect(400, {error: 'Token not found'})
};

const expectFieldRequiredError = (server, endPoint, token, method = 'post') => {
	return request(server)[method](endPoint)
		.send({})
		.set('Authorization', `Bearer ${token || ''}`)
		.expect(400)
		.then(({body: {error}}) => {
			const keyWords = ['field', 'required'];
			const keyWordsExist = keyWords.every(kw => error.includes(kw));
			expect(keyWordsExist).toBe(true);
		});
};

module.exports = {
	loginAsAdmin,
	loginWithCredentials,
	addProductToCart,
	getUsers,
	getKey,
	getProduct,
	expectTokenNotFoundError,
	expectFieldRequiredError
};
