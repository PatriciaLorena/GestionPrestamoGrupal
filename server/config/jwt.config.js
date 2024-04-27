const jwt = require("jsonwebtoken");
const secret = "mysecret";
module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
  jwt.verify(req.cookies.usertoken, secret, (err, payload) => {
    if (err) {
      console.log(req.cookies.usertoken);
      res.status(401).json({ verified: false, msg: "El token no es válido!" });
    } else {
      next();
    }
  });
};
