const {Router} = require('express');
const db = require('../models/index');
const {getToken, verifyUser, parseResults} = require('../helpers');

const router = Router();
const {Key, Cart} = db;

router.post('/', async ({body: {game_id}, headers: {authorization}}, res) => {
	const token = getToken(authorization);
	const user = verifyUser(token, res);
	if (user) {
		if (game_id) {
			const key = await Key.findOne({where: {game_id, isUsed: 0}});
			if (key) {
				const results = await key.update({isUsed: 1});
				await Cart.create({
					game_id,
					user_id: user.id,
					key_id: parseResults(results).id
				});
				res.status(201).json({success: 'Key was added to cart'});
			} else {
				res.status(400).json({error: 'Product does not have unused keys'});
			}
		} else {
			res.status(400).json({error: 'game_id field is required'});
		}
	}
});

router.delete('/', async ({body: {game_id}, headers: {authorization}}, res) => {
	const token = getToken(authorization);
	const user = verifyUser(token, res);
	if (user) {
		if (game_id) {
			const cart = await Cart.findOne({
				where: {game_id, user_id: user.id, order_id: null}
			});
			if (cart) {
				const results = await cart.destroy();
				await Key.update(
					{isUsed: 0},
					{where: {id: parseResults(results).key_id}}
				);
				res.status(200).json({success: 'Key was removed from cart'});
			} else {
				res.status(400).json({error: 'Key was not found in cart'});
			}
		} else {
			res.status(400).json({error: 'game_id field is required'});
		}
	}
});

router.get('/', async ({headers: {authorization}}, res) => {
	const token = getToken(authorization);
	const user = verifyUser(token, res);
	if (user) {
		const data = await Cart.findAll({
			where: {
				user_id: user.id,
				order_id: null
			},
			attributes: [
				'game_id',
				[db.sequelize.fn('COUNT', db.sequelize.col('game_id')), 'count']
			],
			group: 'Cart.game_id'
		});
		res.json({results: parseResults(data)});
	}
});

module.exports = router;
