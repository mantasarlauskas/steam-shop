const {Router} = require('express');
const {User, Review} = require('../models/index');
const {getToken, verifyUser, parseResults} = require('../helpers');

const router = Router();

router.post('/', async ({body: {text, game_id, rating}, headers: {authorization}}, res) => {
	const token = getToken(authorization);
	const user = verifyUser(token, res);
	if (user) {
		if (text && game_id && rating) {
			await Review.create({text, game_id, rating, user_id: user.id});
			res.status(201).json({success: 'Review was added'});
		} else {
			res.status(400).json({error: 'text, game_id and rating fields are required'});
		}
	}
});

router.put('/', async ({body: {text, id, rating}, headers: {authorization}}, res) => {
	const token = getToken(authorization);
	const user = verifyUser(token, res);
	if (user) {
		if (text && id && rating) {
			const review = await Review.find({where: {id}});
			if (review) {
				review.update({text, rating});
				res.status(200).json({success: 'Review was updated'});
			} else {
				res.status(400).json({error: 'Review does not exist'});
			}
		} else {
			res.status(400).json({error: 'text, id and rating fields are required'});
		}
	}
});

router.delete(
	'/',
	async ({body: {id}, headers: {authorization}}, res) => {
		const token = getToken(authorization);
		const user = verifyUser(token, res);
		if (user) {
			if (id) {
				const review = await Review.find({where: {id}});
				if (review) {
					if (user.id === review.user_id || user.role === 1) {
						await review.destroy();
						res.status(200).json({success: 'Review was deleted'});
					} else {
						res.status(401).json({error: 'User does not have rights'});
					}
				} else {
					res.status(400).json({error: 'Review does not exist'});
				}
			} else {
				res.status(400).json({error: 'id field is required'});
			}
		}
	}
);

router.get('/', async (req, res) => {
	const data = await Review.findAll({
		include: [
			{
				model: User,
				required: true,
				attributes: ['username']
			}
		]
	});
	res.json({reviews: parseResults(data)});
});

router.get('/:id', async ({params: {id}}, res) => {
	const data = await Review.findAll({
		where: {game_id: id},
		include: [
			{
				model: User,
				required: true,
				attributes: ['username']
			}
		]
	});
	res.json({reviews: parseResults(data)});
});

module.exports = router;
