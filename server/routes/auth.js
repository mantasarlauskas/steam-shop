const {Router} = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {User} = require('../models/index');
const {getToken, verifyUser, parseResults} = require('../helpers');

const router = Router();

router.post('/login', async ({body: {username, password}}, res) => {
	if (username && password) {
		const results = await User.find({where: {username}});
		const data = parseResults(results);
		if (!data) {
			res.status(401).json({error: 'User does not exist'});
		} else if (data.isBanned === true) {
			res.status(403).json({error: 'User is banned'});
		} else {
			if (bcrypt.compareSync(password, data.password)) {
				res.json({token: jwt.sign(data, 'key')});
			} else {
				res.status(401).json({error: 'Wrong password'});
			}
		}
		return;
	}
	res.status(400).json({error: 'username and password fields are required'});
});

router.post('/register', ({body: {username, email, password}}, res) => {
	if (username && email && password) {
		User.findOrCreate({
			where: {username},
			defaults: {
				email,
				password: bcrypt.hashSync(password, 10)
			}
		}).spread((user, created) => {
			if (created) {
				res.status(201).json({success: 'Successful registration'});
			} else {
				res.status(400).json({error: 'User already exists'});
			}
		});
		return;
	}
	res.status(400).json({error: 'username, email and password fields are required'});
});

router.post('/password', async ({body: {password, currentPassword}, headers: {authorization}}, res) => {
	const token = getToken(authorization);
	const user = verifyUser(token, res);
	if (user) {
		if (password && currentPassword) {
			const data = await User.find({where: {id: user.id}});
			if (bcrypt.compareSync(currentPassword, data.password)) {
				await data.update({password: bcrypt.hashSync(password, 10)});
				res.status(200).json({success: 'Password changed'});
			} else {
				res.status(401).json({error: 'Wrong password'});
			}
		} else {
			res.status(400).json({error: 'password and currentPassword fields are required'});
		}
	}
});

module.exports = router;
