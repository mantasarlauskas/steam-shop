const {Router} = require('express');
const {Key, Product} = require('../models/index');
const {getToken, verifyAdmin} = require('../helpers');

const router = Router();

router.post('/', async ({body: {game_id, steam_key}, headers: {authorization}}, res) => {
	const token = getToken(authorization);
	if (verifyAdmin(token, res)) {
		if (game_id && steam_key) {
			await Key.create({game_id, steam_key});
			res.status(201).json({success: 'Key was added'});
		} else {
			res.status(400).json({error: 'game_id and steam_key fields are required'});
		}
	}
});

router.put('/', async ({body: {id, game_id, steam_key}, headers: {authorization}}, res) => {
	const token = getToken(authorization);
	if (verifyAdmin(token, res)) {
		if (id && game_id && steam_key) {
			const key = await Key.findOne({where: {id}});
			if (key) {
				await key.update({game_id, steam_key});
				res.status(200).json({success: 'Key was updated'});
			} else {
				res.status(404).json({error: 'Key does not exist'});
			}
		} else {
			res.status(400).json({error: 'id, game_id and steam_key fields are required'});
		}
	}
});

router.delete('/', async ({body: {id}, headers: {authorization}}, res) => {
	const token = getToken(authorization);
	if (verifyAdmin(token, res)) {
		if (id) {
			const key = await Key.find({where: {id}});
			if (key) {
				await key.destroy();
				res.status(200).json({success: 'Key was deleted'});
			} else {
				res.status(404).json({error: 'Key does not exist'});
			}
		} else {
			res.status(400).json({error: 'id field is required'});
		}
	}
});

router.get('/', async ({headers: {authorization}}, res) => {
	const token = getToken(authorization);
	if (verifyAdmin(token, res)) {
		const data = await Key.findAll({
			order: [['createdAt', 'DESC']],
			include: [
				{
					model: Product,
					required: true,
					attributes: ['title']
				}
			]
		});
		res.json({keys: data});
	}
});

router.get(
	'/:id',
	async ({headers: {authorization}, params: {id}}, res) => {
		const token = getToken(authorization);
		if (verifyAdmin(token, res)) {
			const data = await Key.find({where: {id}});
			if (data) {
				res.json({key: data});
			} else {
				res.status(404).json({error: 'Key does not exist'});
			}
		}
	}
);

module.exports = router;
