const { Router } = require("express");
const { Cart, Key, Product } = require("../models/index");
const { getToken, verifyUser } = require("../helpers");

const router = Router();

/**
 * Route, skirtas nurodyto užsakymo raktų grąžinimui
 */
router.get(
  "/:id",
  async ({ headers: { authorization }, params: { id } }, res) => {
    const token = getToken(authorization);
    const user = verifyUser(token, res);
    if (user) {
      const cart = await Cart.findAll({
        where: { order_id: id },
        include: [
          {
            model: Key,
            required: true,
            attributes: ["steam_key"]
          },
          {
            model: Product,
            required: true,
            attributes: ["title"]
          }
        ]
      });
      if (cart && (user.role === 1 || user.id === cart[0].user_id)) {
        res.send(cart);
      } else {
        res.status(400).json("Vartotojas negali gauti raktų");
      }
    }
  }
);

module.exports = router;
