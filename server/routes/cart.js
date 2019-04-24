const { Router } = require("express");
const db = require("../models/index");
const { getToken, verifyUser, parseResults } = require("../helpers");

const router = Router();
const { Key, Cart } = db;

/**
 * Route, skirtas pridėti prekę į krepšelį
 */
router.post("/", async ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  const user = verifyUser(token, res);
  if (user) {
    const key = await Key.findOne({
      where: { game_id: body.game_id, isUsed: 0 }
    });
    if (key) {
      const results = await key.update({ isUsed: 1 });
      await Cart.create({
        ...body,
        user_id: user.id,
        key_id: parseResults(results).id
      });
      res.status(200).json("Krepšelis papildytas");
    }
  }
});

/**
 * Route, skirtas prekės iš krepšelio šalinimui
 */
router.delete("/", async ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  const user = verifyUser(token, res);
  if (user) {
    const cart = await Cart.findOne({
      where: { game_id: body.game_id, user_id: user.id, order_id: null }
    });
    if (cart) {
      const results = await cart.destroy();
      await Key.update(
        { isUsed: 0 },
        { where: { id: parseResults(results).key_id } }
      );
      res.status(200).json("Sėkmingai pašalintas");
    }
  }
});

/**
 * Route, skirtas vartotojo krepšelio grąžinimui
 */
router.get("/", async ({ headers: { authorization } }, res) => {
  const token = getToken(authorization);
  const user = verifyUser(token, res);
  if (user) {
    const data = await Cart.findAll({
      where: {
        user_id: user.id,
        order_id: null
      },
      attributes: [
        "game_id",
        [db.sequelize.fn("COUNT", db.sequelize.col("game_id")), "count"]
      ],
      group: "Cart.game_id"
    });
    res.send(parseResults(data));
  }
});

module.exports = router;
