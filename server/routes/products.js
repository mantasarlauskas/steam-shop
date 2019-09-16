const {Router} = require('express');
const db = require('../models/index');
const {getToken, verifyAdmin} = require('../helpers');

const router = Router();
const {Key, Product, Review} = db;

router.get('/', async (req, res) => {
	const data = await Product.findAll({
		attributes: [
			'id',
			'title',
			'price',
			'logo',
			'description',
			'timesBought',
			[
				db.sequelize.fn('COUNT', db.sequelize.col('Keys.game_id')),
				'totalCount'
			],
			[db.sequelize.fn('SUM', db.sequelize.col('Keys.isUsed')), 'usedCount']
		],
		include: [
			{
				model: Key,
				attributes: [],
				required: false
			}
		],
		group: 'Product.id'
	});
	res.json({products: data});
});

router.post('/', async ({body: {title, price, description, logo}, headers: {authorization}}, res) => {
	const token = getToken(authorization);
	if (verifyAdmin(token, res)) {
		if (title && price && description && logo) {
			await Product.create({title, price, description, logo});
			res.status(201).json({success: 'Product was added'});
		} else {
			res.status(400).json({error: 'title, price, description and logo fields are required'});
		}
	}
});

router.put('/', async ({body: {title, price, description, logo, id}, headers: {authorization}}, res) => {
	const token = getToken(authorization);
	if (verifyAdmin(token, res)) {
		if (title && price && description && logo && id) {
			const product = await Product.findOne({where: {id}});
			if (product) {
				await product.update({title, price, description, logo});
				res.status(200).json({success: 'Product was updated'});
			} else {
				res.status(400).json({error: 'Product does not exist'});
			}
		} else {
			res.status(400).json({error: 'title, price, description, id and logo fields are required'});
		}
	}
});

router.delete('/', async ({body: {id}, headers: {authorization}}, res) => {
	const token = getToken(authorization);
	if (verifyAdmin(token, res)) {
		if (id) {
			const product = await Product.find({where: {id}});
			if (product) {
				const reviews = await Review.findAll({where: {game_id: id}});
				await reviews.forEach(review => review.destroy());
				await product.destroy();
				res.status(200).json({success: 'Product was deleted'});
			} else {
				res.status(400).json({error: 'Product does not exist'});
			}
		} else {
			res.status(400).json({error: 'id field is required'});
		}
	}
});

router.get('/:id', async ({params: {id}}, res) => {
	const data = await Product.find({
		attributes: [
			'id',
			'title',
			'price',
			'logo',
			'description',
			'timesBought',
			[
				db.sequelize.fn('COUNT', db.sequelize.col('Keys.game_id')),
				'totalCount'
			],
			[db.sequelize.fn('SUM', db.sequelize.col('Keys.isUsed')), 'usedCount']
		],
		include: [
			{
				model: Key,
				attributes: [],
				required: false
			}
		],
		group: 'Product.id',
		where: {id}
	});
	if (data) {
		res.json({product: data});
	} else {
		res.status(400).json({error: 'Product does not exist'});
	}
});

module.exports = router;
