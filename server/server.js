const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const bcrypt = require('bcrypt');
const { User, Product, Key } = require('./models');
const sequelize = require('./connection');
const jwt = require('jsonwebtoken');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
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

const getToken = authorization => {
  return authorization && authorization.split(' ')[0] === "Bearer" ? authorization.split(' ')[1] : null;
};

app.post('/login', ({ body: { username, password } }, res) => {
  User
  .findById(username)
  .then(data => {
    if(!data) {
      res.status(400).json("Toks vartotojas neegzistuoja");
    } else if(parseResults(data).isBanned === 1) {
      res.status(400).json("Vartotojas yra užblokuotas");
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
  User.findOrCreate({ where: { username: username }, defaults: { email: email, password: bcrypt.hashSync(password, 10) } })
  .spread((user, created) => created ? res.status(200).json("Registracija sėkminga") : res.status(400).json("Toks vartotojas jau egzistuoja"));
});

app.post('/users', ({ body: { username, ...data }, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if(token) {
    jwt.verify(token, 'key', (err, user) => {
      if(err) {
        res.status(400).json("Neteisingas tokenas");
      } else if(user.username === username) {
        User.update({ ...data, password: bcrypt.hashSync(data.password, 10) }, { where: { username: username } })
        .then(() => res.status(200).json("Profilis buvo sėkmingai redaguotas"));
      } else {
        res.status(400).json("Vartotojas negali redaguoti kito vartotojo");
      } 
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

app.get('/users', ({ headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if(token) {
    jwt.verify(token, 'key', (err, user) => {
      if(err) {
        res.status(400).json("Neteisingas tokenas");
      } else if(user.role === 1) {
        User.findAll().then(data => res.send(parseResults(data)));
      } else {
        res.status(400).json("Vartotojas nėra administratorius");
      } 
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});


app.delete('/users', ({ headers: { authorization }, body: { id } }, res) => {
  const token = getToken(authorization);
  if(token) {
    jwt.verify(token, 'key', (err, user) => {
      if(err) {
        res.status(400).json("Neteisingas tokenas");
      } else if(user.role === 1) {
        User.update({ isBanned: 1 }, { where: { username: id } })
        .then(() => res.status(200).json("Sėkmingai užblokuotas"));
      } else {
        res.status(400).json("Vartotojas nėra administratorius");
      } 
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

app.put('/users', ({ headers: { authorization }, body: { id } }, res) => {
  const token = getToken(authorization);
  if(token) {
    jwt.verify(token, 'key', (err, user) => {
      if(err) {
        res.status(400).json("Neteisingas tokenas");
      } else if(user.role === 1) {
        User.update({ isBanned: 0 }, { where: { username: id } })
        .then(() => res.status(200).json("Sėkmingai atblokuotas"));
      } else {
        res.status(400).json("Vartotojas nėra administratorius");
      } 
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

app.get('/products', (req, res) => {
  Product.findAll().then(data => res.send(data));
});

app.post('/products', ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if(token) {
    jwt.verify(token, 'key', (err, user) => {
      if(err) {
        res.status(400).json("Neteisingas tokenas");
      } else if(user.role === 1) {
        console.log(body);
        Product.create(body).then(() => res.status(200).json("Produktas pridėtas"));
      } else {
        res.status(400).json("Vartotojas negali pridėti produktų");
      } 
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});


app.post('/keys', ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if(token) {
    jwt.verify(token, 'key', (err, user) => {
      if(err) {
        res.status(400).json("Neteisingas tokenas");
      } else if(user.role === 1) {
        console.log(body);
        Key.create(body).then(() => res.status(200).json("Raktas pridėtas"));
      } else {
        res.status(400).json("Vartotojas negali pridėti raktų");
      } 
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

const server = http.listen(5000, () => {
  console.log("server is listening on port", server.address().port);
});

