const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const bcrypt = require("bcrypt");
const db = require("./models/index");
const { Cart, Key, Product, User, Order, Review } = db;
const jwt = require("jsonwebtoken");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const parseResults = result => JSON.parse(JSON.stringify(result));

const getToken = authorization => {
  return authorization && authorization.split(" ")[0] === "Bearer"
    ? authorization.split(" ")[1]
    : null;
};

/**
 * Route skirtas prisijungimo autentifikavimui
 */
app.post("/login", ({ body: { username, password } }, res) => {
  User.find({
    where: { username: username }
  }).then(results => {
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
});

/**
 * Route skirtas naujo vartotojo reigstracijai
 */
app.post("/register", ({ body: { username, email, password } }, res) => {
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
 * Route skirtas slaptažodžio keitimui
 */
app.post("/password", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else {
        User.find({ where: { id: user.id } }).then(data => {
          if (bcrypt.compareSync(body.currentPassword, data.password)) {
            data
              .update({ password: bcrypt.hashSync(body.newPassword, 10) })
              .then(() => res.status(200).json("Slaptažodis pakeistas"));
          } else {
            res.status(400).json("Neteisingas vartotojo slaptažodis");
          }
        });
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas profilio redagavimui (el.paštui)
 */
app.post("/users", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else if (user.id === body.id) {
        User.find({ where: { id: body.id } }).then(user => {
          user
            .update(body)
            .then(() =>
              res.status(200).json("Profilis buvo sėkmingai redaguotas")
            );
        });
      } else {
        res.status(400).json("Vartotojas negali redaguoti kito vartotojo");
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route, kuris grąžina visų vartotojų sąrašą
 */
app.get("/users", ({ headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else if (user.role === 1) {
        User.findAll().then(data => res.send(parseResults(data)));
      } else {
        res.status(400).json("Vartotojas nėra administratorius");
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route, skirtas gauti tokeną prisijungusiam vartotojui
 */
app.get("/users/:id", ({ headers: { authorization }, params: { id } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else {
        User.find({ where: { id } }).then(data => {
          if (data.id === user.id) {
            res.json(jwt.sign(parseResults(data), "key"));
          } else {
            res.status(400).json("Netinkamas vartotojas");
          }
        });
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas vartotojo užblokavimui
 */
app.delete("/users", ({ headers: { authorization }, body: { id } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else if (user.role === 1) {
        User.update({ isBanned: true }, { where: { id: id } }).then(() =>
          res.status(200).json("Sėkmingai užblokuotas")
        );
      } else {
        res.status(400).json("Vartotojas nėra administratorius");
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas vartotojo atblokavimui
 */
app.put("/users", ({ headers: { authorization }, body: { id } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else if (user.role === 1) {
        User.update({ isBanned: false }, { where: { id: id } }).then(() =>
          res.status(200).json("Sėkmingai atblokuotas")
        );
      } else {
        res.status(400).json("Vartotojas nėra administratorius");
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas visų produktų (žaidimų) grąžinimui
 */
app.get("/products", (req, res) => {
  Product.findAll({
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
  }).then(data => res.send(data));
});

/**
 * Route skirtas naujų produktų (žaidimų) pridėjimui
 */
app.post("/products", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else if (user.role === 1) {
        Product.create(body).then(() =>
          res.status(200).json("Produktas pridėtas")
        );
      } else {
        res.status(400).json("Vartotojas negali pridėti produktų");
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas produkto (žaidimų) atnaujinimui (redagavimui)
 */
app.put("/products", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else if (user.role === 1) {
        Product.update(body, { where: { id: body.id } }).then(() =>
          res.status(200).json("Sėkmingai atnaujintas")
        );
      } else {
        res.status(400).json("Vartotojas nėra administratorius");
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas pašalinti produktą (žaidimą)
 */
app.delete("/products", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else {
        Review.findAll({ where: { game_id: body.id } })
          .then(reviews => {
            reviews.forEach(review => review.destroy());
          })
          .then(() => {
            Product.find({ where: { id: body.id } }).then(product => {
              product
                .destroy()
                .then(() => res.status(200).json("Sėkmingai pašalintas"));
            });
          });
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas rakto pridėjimui
 */
app.post("/keys", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else if (user.role === 1) {
        Key.create(body).then(() => res.status(200).json("Raktas pridėtas"));
      } else {
        res.status(400).json("Vartotojas negali pridėti raktų");
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas rakto redagavimui
 */
app.put("/keys", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else if (user.role === 1) {
        Key.update(body, { where: { id: body.id } }).then(() =>
          res.status(200).json("Sėkmingai atnaujintas")
        );
      } else {
        res.status(400).json("Vartotojas nėra administratorius");
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas rakto pašalinimui
 */
app.delete("/keys", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else {
        Key.find({ where: { id: body.id } }).then(key => {
          key
            .destroy()
            .then(() => res.status(200).json("Sėkmingai pašalintas"));
        });
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas visų raktų grąžinimui
 */
app.get("/keys", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else if (user.role === 1) {
        Key.findAll({
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Product,
              required: true,
              attributes: ["title"]
            }
          ]
        }).then(data => res.send(data));
      } else {
        res.status(400).json("Vartotojas nėra administratorius");
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas nurodyto užsakymo raktų grąžinimui
 */
app.get(
  "/order-keys/:id",
  ({ headers: { authorization }, params: { id } }, res) => {
    const token = getToken(authorization);
    if (token) {
      jwt.verify(token, "key", (err, user) => {
        if (err) {
          res.status(400).json("Neteisingas tokenas");
        } else {
          Cart.findAll({
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
          }).then(cart => {
            if (cart && (user.role === 1 || user.id === cart[0].user_id)) {
              res.send(cart);
            } else {
              res.status(400).json("Vartotojas negali gauti raktų");
            }
          });
        }
      });
    } else {
      res.status(400).json("Tokenas nėra prisegtas");
    }
  }
);

/**
 * Route skirtas nurodyto rakto grąžinimui
 */
app.get("/keys/:id", ({ headers: { authorization }, params: { id } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else if (user.role === 1) {
        Key.find({ where: { id: id } }).then(data => res.send(data));
      } else {
        res.status(400).json("Vartotojas negali gauti raktų");
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas pridėti prekę į krepšelį
 */
app.post("/cart", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else {
        Key.findOne({ where: { game_id: body.game_id, isUsed: 0 } }).then(
          key => {
            if (key) {
              key.update({ isUsed: 1 }).then(results => {
                Cart.create({
                  ...body,
                  user_id: user.id,
                  key_id: parseResults(results).id
                }).then(() => res.status(200).json("Krepšelis papildytas"));
              });
            }
          }
        );
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas prekės iš krepšelio šalinimui
 */
app.delete("/cart", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else {
        Cart.findOne({
          where: { game_id: body.game_id, user_id: user.id, order_id: null }
        }).then(cart => {
          if (cart) {
            cart.destroy().then(results => {
              Key.update(
                { isUsed: 0 },
                { where: { id: parseResults(results).key_id } }
              ).then(() => res.status(200).json("Sėkmingai pašalintas"));
            });
          }
        });
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas vartotojo krepšelio grąžinimui
 */
app.get("/cart", ({ headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else {
        Cart.findAll({
          where: {
            user_id: user.id,
            order_id: null
          },
          attributes: [
            "game_id",
            [db.sequelize.fn("COUNT", db.sequelize.col("game_id")), "count"]
          ],
          group: "Cart.game_id"
        }).then(data => res.send(parseResults(data)));
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas užsakymo suformavimui
 */
app.post("/order", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else {
        Order.create({ user_id: user.id }).then(order => {
          Cart.findAll({
            where: {
              user_id: user.id,
              order_id: null
            }
          }).then(data => {
            data.forEach(cart => {
              cart.update({ order_id: parseResults(order).id }).then(() => {
                Product.find({ where: { id: cart.game_id } }).then(
                  product =>
                    product &&
                    product.update({
                      timesBought: parseInt(product.timesBought) + 1
                    })
                );
              });
            });
            res.status(200).json("Užsakymas sėkmingai sukurtas");
          });
        });
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas vartotojo užsakymų grąžinimui
 */
app.get("/orders", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else {
        Cart.findAll({
          where: {
            user_id: user.id,
            order_id: {
              [db.sequelize.Op.ne]: null
            }
          },
          attributes: [
            "game_id",
            "order_id",
            [db.sequelize.fn("COUNT", db.sequelize.col("game_id")), "count"]
          ],
          include: [
            {
              model: Order,
              required: true,
              attributes: ["createdAt"]
            }
          ],
          group: ["Cart.game_id", "Order.id", "Order.createdAt"],
          order: [["Order", "createdAt", "DESC"]]
        }).then(data => res.send(data));
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas nurodyto užsakymo grąžinimui
 */
app.get("/order/:id", ({ headers: { authorization }, params: { id } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else {
        Cart.findAll({
          where: {
            user_id: user.id,
            order_id: id
          },
          attributes: [
            "game_id",
            [db.sequelize.fn("COUNT", db.sequelize.col("game_id")), "count"]
          ],
          group: "Cart.game_id"
        }).then(data => res.send(parseResults(data)));
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas atsiliepimo pridėjimui
 */
app.post("/review", ({ body, headers: { authorization } }, res) => {
  const token = getToken(authorization);
  if (token) {
    jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
      } else {
        Review.create({ ...body, user_id: user.id }).then(() =>
          res.status(200).json("Atsiliepimas pridėtas")
        );
      }
    });
  } else {
    res.status(400).json("Tokenas nėra prisegtas");
  }
});

/**
 * Route skirtas atsiliepimo pašalinimui
 */
app.delete(
  "/review",
  ({ body: { user_id, id, ...data }, headers: { authorization } }, res) => {
    const token = getToken(authorization);
    if (token) {
      jwt.verify(token, "key", (err, user) => {
        if (err) {
          res.status(400).json("Neteisingas tokenas");
        } else if (user.role === 1 || user.id === user_id) {
          Review.destroy({
            where: { id: id, user_id: user_id }
          }).then(() => res.status(200).json("Sėkmingai pašalintas"));
        } else {
          res.status(400).json("Vartotojas neturi teisės šalinti atsiliepimą");
        }
      });
    } else {
      res.status(400).json("Tokenas nėra prisegtas");
    }
  }
);

/**
 * Route skirtas nurodytos prekės(žaidimo) atsiliepimų grąžinimui
 */
app.get("/review/:id", ({ params: { id } }, res) => {
  Review.findAll({
    where: { game_id: id },
    include: [
      {
        model: User,
        required: true,
        attributes: ["username"]
      }
    ]
  }).then(data => res.send(parseResults(data)));
});

const server = http.listen(5000, () => {
  console.log("server is listening on port", server.address().port);
});
