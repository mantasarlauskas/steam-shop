const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const auth = require('./routes/auth');
const keys = require('./routes/keys');
const users = require('./routes/users');
const products = require('./routes/products');
const cart = require('./routes/cart');
const orders = require('./routes/orders');
const reviews = require('./routes/reviews');
const orderKeys = require('./routes/orderKeys');
const port = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	next();
});

app.use('/api/', auth);
app.use('/api/keys', keys);
app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/cart', cart);
app.use('/api/orders', orders);
app.use('/api/reviews', reviews);
app.use('/api/order-keys', orderKeys);

app.all('/api/*', (req, res) => {
	res.status(404).json({error: 'endpoint does not exist'});
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/public/index.html'));
});

app.all('*', (req, res) => {
	res.status(404).json({error: 'endpoint does not exist'});
});

app.use(express.static(path.join(__dirname, '../client/build')));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/../client/build/index.html'));
	});
}

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/../client/public/index.html'));
});

const server = app.listen(port);

module.exports = server;
