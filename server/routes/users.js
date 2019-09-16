const {Router} = require('express');
const jwt = require('jsonwebtoken');
const {User} = require('../models/index');
const {
	getToken,
	verifyAdmin,
	verifySelf,
	verifyUser,
	parseResults
} = require('../helpers');

const router = Router();

router.post('/', async ({body: {email, id}, headers: {authorization}}, res) => {
	const token = getToken(authorization);
	if (verifySelf(token, id, res)) {
		if (email && id) {
			const user = await User.find({where: {id}});
			await user.update({email});
			res.status(200).json({success: 'Email was changed'});
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
	const user = verifyUser(token, res);
	if (user) {
		const data = await User.find({where: {id}});
		if (data.id === user.id) {
			res.json({token: jwt.sign(parseResults(data), 'key')});
		} else {
			res.status(400).json({error: 'Wrong user'});
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
