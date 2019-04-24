const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const {
  getToken,
  verifyAdmin,
  verifySelf,
  verifyUser,
  parseResults
} = require("../helpers");

const router = Router();

/**
 * Route, skirtas profilio redagavimui (el.paštui)
 */
router.post("/", async ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (verifySelf(token, body.id, res)) {
    const user = await User.find({ where: { id: body.id } });
    await user.update(body);
    res.status(200).json("Profilis buvo sėkmingai redaguotas");
  }
});

/**
 * Route, kuris grąžina visų vartotojų sąrašą
 */
router.get("/", async ({ headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (verifyAdmin(token, res)) {
    const data = await User.findAll();
    res.send(parseResults(data));
  }
});

/**
 * Route, skirtas gauti tokeną prisijungusiam vartotojui
 */
router.get(
  "/:id",
  async ({ headers: { authorization }, params: { id } }, res) => {
    const token = getToken(authorization);
    const user = verifyUser(token, res);
    if (user) {
      const data = await User.find({ where: { id } });
      if (data.id === user.id) {
        res.json(jwt.sign(parseResults(data), "key"));
      } else {
        res.status(400).json("Netinkamas vartotojas");
      }
    }
  }
);

/**
 * Route, skirtas vartotojo užblokavimui
 */
router.delete(
  "/",
  async ({ headers: { authorization }, body: { id } }, res) => {
    const token = getToken(authorization);
    if (verifyAdmin(token, res)) {
      await User.update({ isBanned: true }, { where: { id: id } });
      res.status(200).json("Sėkmingai užblokuotas");
    }
  }
);

/**
 * Route, skirtas vartotojo atblokavimui
 */
router.put("/", async ({ headers: { authorization }, body: { id } }, res) => {
  const token = getToken(authorization);
  if (verifyAdmin(token, res)) {
    await User.update({ isBanned: false }, { where: { id: id } });
    res.status(200).json("Sėkmingai atblokuotas");
  }
});

module.exports = router;
