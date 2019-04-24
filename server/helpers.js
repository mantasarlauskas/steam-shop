const jwt = require("jsonwebtoken");

const parseResults = result => JSON.parse(JSON.stringify(result));

const getToken = authorization => {
  return authorization && authorization.split(" ")[0] === "Bearer"
    ? authorization.split(" ")[1]
    : null;
};

const verifyAdmin = (token, res) => {
  if (token) {
    return jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
        return false;
      } else if (user.role === 1) {
        return true;
      } else {
        res.status(400).json("Vartotojas neturi teisių veiksmui atlikti");
        return false;
      }
    });
  }
  res.status(400).json("Tokenas nėra prisegtas");
  return false;
};

const verifySelf = (token, id, res) => {
  if (token) {
    return jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
        return false;
      } else if (user.id === id) {
        return true;
      } else {
        res
          .status(400)
          .json("Vartotojas gali atlikti veiksmus tik su savo paskyra");
        return false;
      }
    });
  }
  res.status(400).json("Tokenas nėra prisegtas");
  return false;
};

const verifyUser = (token, res) => {
  if (token) {
    return jwt.verify(token, "key", (err, user) => {
      if (err) {
        res.status(400).json("Neteisingas tokenas");
        return false;
      } else {
        return user;
      }
    });
  }
  res.status(400).json("Tokenas nėra prisegtas");
  return false;
};

module.exports = {
  parseResults,
  getToken,
  verifyAdmin,
  verifySelf,
  verifyUser
};
