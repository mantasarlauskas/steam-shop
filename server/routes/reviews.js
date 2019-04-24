const { Router } = require("express");
const { User, Review } = require("../models/index");
const { getToken, verifyUser, parseResults } = require("../helpers");

const router = Router();

/**
 * Route, skirtas atsiliepimo pridėjimui
 */
router.post("/", async ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  const user = verifyUser(token, res);
  if (user) {
    await Review.create({ ...body, user_id: user.id });
    res.status(200).json("Atsiliepimas pridėtas");
  }
});

/**
 * Route, skirtas atsiliepimo pašalinimui
 */
router.delete(
  "/",
  async ({ body: { user_id, id }, headers: { authorization } }, res) => {
    const token = getToken(authorization);
    const user = verifyUser(token, res);
    if (user.id === user_id || user.role === 1) {
      await Review.destroy({ where: { id: id, user_id: user_id } });
      res.status(200).json("Sėkmingai pašalintas");
    }
  }
);

/**
 * Route, skirtas nurodytos prekės(žaidimo) atsiliepimų grąžinimui
 */
router.get("/:id", async ({ params: { id } }, res) => {
  const data = await Review.findAll({
    where: { game_id: id },
    include: [
      {
        model: User,
        required: true,
        attributes: ["username"]
      }
    ]
  });
  res.send(parseResults(data));
});

module.exports = router;
