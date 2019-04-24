const { Router } = require("express");
const db = require("../models/index");
const { getToken, verifyAdmin } = require("../helpers");

const router = Router();
const { Key, Product, Review } = db;

/**
 * Route, skirtas visų produktų (žaidimų) grąžinimui
 */
router.get("/", async (req, res) => {
  const data = await Product.findAll({
    attributes: [
      "id",
      "title",
      "price",
      "logo",
      "description",
      "timesBought",
      [
        db.sequelize.fn("COUNT", db.sequelize.col("Keys.game_id")),
        "totalCount"
      ],
      [db.sequelize.fn("SUM", db.sequelize.col("Keys.isUsed")), "usedCount"]
    ],
    include: [
      {
        model: Key,
        attributes: [],
        required: false
      }
    ],
    group: "Product.id"
  });
  res.send(data);
});

/**
 * Route, skirtas naujų produktų (žaidimų) pridėjimui
 */
router.post("/", async ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (verifyAdmin(token, res)) {
    await Product.create(body);
    res.status(200).json("Produktas pridėtas");
  }
});

/**
 * Route, skirtas produkto (žaidimų) atnaujinimui (redagavimui)
 */
router.put("/", async ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (verifyAdmin(token, res)) {
    await Product.update(body, { where: { id: body.id } });
    res.status(200).json("Sėkmingai atnaujintas");
  }
});

/**
 * Route, skirtas pašalinti produktą (žaidimą)
 */
router.delete("/", async ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (verifyAdmin(token, res)) {
    const reviews = await Review.findAll({ where: { game_id: body.id } });
    await reviews.forEach(review => review.destroy());
    const product = await Product.find({ where: { id: body.id } });
    await product.destroy();
    res.status(200).json("Sėkmingai pašalintas");
  }
});

module.exports = router;
