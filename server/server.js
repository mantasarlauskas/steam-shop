const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const { User, sequelize } = require('./models');
const jwt = require('jsonwebtoken');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

sequelize.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

const parseResults = result => JSON.parse(JSON.stringify(result));

app.post('/login', ({ body: { username, password } }, res) => {
  User
  .findById(username)
  .then(data => {
    if(!data) {
      res.status(400).json("Toks vartotojas neegzistuoja");
    } else {
      const user = parseResults(data);
      if(bcrypt.compareSync(password, user.password)) {
        res.json(jwt.sign(user, 'key'));
      } else {
        res.status(400).json("Neteisingas vartotojo slaptažodis");
      }
    }
  });
});

app.post('/register', ({ body: { username, email, password } }, res) => {
  User
  .findOrCreate({ where: { username: username }, defaults: { email: email, password: bcrypt.hashSync(password, 10) } })
  .spread((user, created) => created ? res.status(200).json("Registracija sėkminga") : res.status(400).json("Toks vartotojas jau egzistuoja"));
});

const server = http.listen(5000, () => {
  console.log("server is listening on port", server.address().port);
});

