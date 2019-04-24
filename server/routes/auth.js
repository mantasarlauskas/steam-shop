const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/index");
const { getToken, verifyUser, parseResults } = require("../helpers");

const router = Router();

/**
 * Route, skirtas prisijungimo autentifikavimui
 */
router.post("/login", async ({ body: { username, password } }, res) => {
  const results = await User.find({ where: { username: username } });
  const data = parseResults(results);
  if (!data) {
    res.status(400).json("Toks vartotojas neegzistuoja");
  } else if (data.isBanned === true) {
    res.status(400).json("Vartotojas yra užblokuotas");
  } else {
    if (bcrypt.compareSync(password, data.password)) {
      res.json(jwt.sign(data, "key"));
    } else {
      res.status(400).json("Neteisingas vartotojo slaptažodis");
    }
  }
});

/**
 * Route, skirtas naujo vartotojo reigstracijai
 */
router.post("/register", ({ body: { username, email, password } }, res) => {
  User.findOrCreate({
    where: { username: username },
    defaults: {
      email: email,
      password: bcrypt.hashSync(password, 10)
    }
  }).spread((user, created) =>
    created
      ? res.status(200).json("Registracija sėkminga")
      : res.status(400).json("Toks vartotojas jau egzistuoja")
  );
});

/**
 * Route, skirtas slaptažodžio keitimui
 */
router.post("/password", async ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  const user = verifyUser(token, res);
  if (user) {
    const data = await User.find({ where: { id: user.id } });
    if (bcrypt.compareSync(body.currentPassword, data.password)) {
      await data.update({ password: bcrypt.hashSync(body.password1, 10) });
      res.status(200).json("Slaptažodis pakeistas");
    } else {
      res.status(400).json("Neteisingas vartotojo slaptažodis");
    }
  }
});

module.exports = router;
