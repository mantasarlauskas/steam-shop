const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const auth = require("./routes/auth");
const keys = require("./routes/keys");
const users = require("./routes/users");
const products = require("./routes/products");
const cart = require("./routes/cart");
const orders = require("./routes/orders");
const reviews = require("./routes/reviews");
const orderKeys = require("./routes/orderKeys");

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

app.use("/", auth);
app.use("/keys", keys);
app.use("/users", users);
app.use("/products", products);
app.use("/cart", cart);
app.use("/orders", orders);
app.use("/reviews", reviews);
app.use("/order-keys", orderKeys);

const server = http.listen(5000, () => {
  console.log("server is listening on port", server.address().port);
});
