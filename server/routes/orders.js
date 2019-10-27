const {Router} = require('express');
const db = require('../models/index');
const {getToken, verifyUser, parseResults} = require('../helpers');

const router = Router();
const {Order, Cart, Product} = db;

router.post('/', async ({headers: {authorization}}, res) => {
	const token = getToken(authorization);
	const user = verifyUser(token, res);
	if (user) {
		const data = await Cart.findAll({
			where: {
				user_id: user.id,
				order_id: null
			}
		});

		if (data.length > 0) {
			const order = await Order.create({user_id: user.id});
			data.forEach(async cart => {
				if (cart) {
					await cart.update({order_id: parseResults(order).id});
					const product = await Product.find({where: {id: cart.game_id}});
					product &&
					(await product.update({
						timesBought: parseInt(product.timesBought) + 1
					}));
				}
			});

			res.status(201).json({success: 'Order was created'});
		} else {
			res.status(400).json({success: 'Shopping cart is empty'});
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
				order_id: {
					[db.sequelize.Op.ne]: null
				}
			},
			attributes: [
				'game_id',
				'order_id',
				[db.sequelize.fn('COUNT', db.sequelize.col('game_id')), 'count']
			],
			include: [
				{
					model: Order,
					required: true,
					attributes: ['createdAt']
				}
			],
			group: ['Cart.game_id', 'Order.id', 'Order.createdAt'],
			order: [['Order', 'createdAt', 'DESC']]
		});
		res.json({orders: data});
	}
});

module.exports = router;
