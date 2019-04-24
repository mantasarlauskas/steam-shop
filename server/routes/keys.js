const { Router } = require("express");
const { Key, Product } = require("../models/index");
const { getToken, verifyAdmin } = require("../helpers");

const router = Router();

/**
 * Route, skirtas rakto pridėjimui
 */
router.post("/", async ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (verifyAdmin(token, res)) {
    await Key.create(body);
    res.status(200).json("Raktas pridėtas");
  }
});

/**
 * Route, skirtas rakto redagavimui
 */
router.put("/", async ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (verifyAdmin(token, res)) {
    await Key.update(body, { where: { id: body.id } });
    res.status(200).json("Sėkmingai atnaujintas");
  }
});

/**
 * Route, skirtas rakto pašalinimui
 */
router.delete("/", async ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (verifyAdmin(token, res)) {
    const key = await Key.find({ where: { id: body.id } });
    await key.destroy();
    res.status(200).json("Sėkmingai pašalintas");
  }
});

/**
 * Route, skirtas visų raktų grąžinimui
 */
router.get("/", async ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (verifyAdmin(token, res)) {
    const data = await Key.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: Product,
          required: true,
          attributes: ["title"]
        }
      ]
    });
    res.send(data);
  }
});

/**
 * Route, skirtas nurodyto rakto grąžinimui
 */
router.get(
  "/:id",
  async ({ headers: { authorization }, params: { id } }, res) => {
    const token = getToken(authorization);
    if (verifyAdmin(token, res)) {
      const data = await Key.find({ where: { id: id } });
      res.send(data);
    }
  }
);

module.exports = router;
