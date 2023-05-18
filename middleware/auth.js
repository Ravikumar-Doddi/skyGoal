require("dotenv").config();

const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  let token = req.headers.authorization;

  if (typeof token !== "undefined") {
    let finalToken = token.split(" ")[1];
    jwt.verify(finalToken, process.env.SECRET_KEY, (err, user) => {
      if (user !== undefined) {
        req.user = user;
        next();
      } else {
        res.send({ success: false, message: "Unauthorized" });
      }
    });
  } else {
    res.send({ success: false, message: "Unauthorized" });
  }
};

module.exports = authentication;
