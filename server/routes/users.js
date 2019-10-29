const {Router} = require('express');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');
const {User} = require('../models/index');
const {
	getToken,
	verifyAdmin,
	verifySelf,
	parseResults
} = require('../helpers');

const router = Router();

router.post('/', async ({body: {email}, headers: {authorization}}, res) => {
	const token = getToken(authorization);
	const id = (jwt.decode(token) || {}).id;
	if (verifySelf(token, id, res)) {
		if (email && id) {
			if (validator.validate(email)) {
				const user = await User.find({where: {id}});
				await user.update({email});
				res.status(200).json({success: 'Email was changed'});
			} else {
				res.status(400).json({error: 'Wrong email format'});
			}
		} else {
			res.status(400).json({error: 'email and id fields are required'});
		}
	}
});

router.get('/', async ({headers: {authorization}}, res) => {
	const token = getToken(authorization);
	if (verifyAdmin(token, res)) {
		const data = await User.findAll();
		res.json({users: parseResults(data)});
	}
});

router.get('/:id', async ({headers: {authorization}, params: {id}}, res) => {
	const token = getToken(authorization);
	if (verifyAdmin(token, res)) {
		const data = await User.find({where: {id}});
		if (data) {
			res.json({user: parseResults(data)});
		} else {
			res.status(404).json({error: 'User does not exist'});
		}
	}
});

router.delete('/', async ({headers: {authorization}, body: {id}}, res) => {
	const token = getToken(authorization);
	if (verifyAdmin(token, res)) {
		await User.update({isBanned: true}, {where: {id: id}});
		res.status(200).json({success: "Successfully banned"});
	}
});

router.put('/', async ({headers: {authorization}, body: {id}}, res) => {
	const token = getToken(authorization);
	if (verifyAdmin(token, res)) {
		await User.update({isBanned: false}, {where: {id: id}});
		res.status(200).json({success: "Successfully unbanned"});
	}
});

module.exports = router;
