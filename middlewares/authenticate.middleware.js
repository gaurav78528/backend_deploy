const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        req.body.user = decoded.userID;
        // console.log(decoded);
        next();
      } else {
        res.send({ msg: "Please login first.", err: err });
      }
    });
  } else {
    res.send({ mag: "Please Login First." });
  }
};

module.exports = { authenticate };
