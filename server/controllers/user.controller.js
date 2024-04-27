const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  register: (req, res) => {
    const user = new UserModel(req.body);
    user
      .save()
      .then(() => {
        res.status(200).json({ msg: "success!", user: user });
      })
      .catch((err) => res.status(400).json(err));
  },
  logout: (req, res) => {
    // clear the cookie from the response
    res.clearCookie("usertoken");
    res.status(200).json({
      message: "You have successfully logged out",
    });
  },
  login: (req, res) => {
    console.log("Request body:", req.body); // Verificar el cuerpo de la solicitud

    UserModel.findOne({ email: req.body.email })
      .then((user) => {
        console.log("User found:", user); // Verificar si se encontró un usuario

        if (user === null) {
          res.status(400).json({ msg: "invalid login attempt" });
        } else {
          if (req.body.password === undefined) {
            res.status(400).json({ msg: "invalid login attempt" });
          }

          bcrypt
            .compare(req.body.password, user.password)
            .then((passwordIsValid) => {
              console.log("passwordIsValid:", passwordIsValid); // Verificar si la contraseña es válida

              if (passwordIsValid) {
                const userInfo = {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                };
                console.log("userInfo:", userInfo); // Verificar el objeto userInfo

                const secret = "mysecret";
                const newJWT = jwt.sign(userInfo, secret);
                console.log("newJWT:", newJWT); // Verificar el token JWT generado

                res
                  .status(200)
                  .cookie("usertoken", newJWT, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 900000000),
                  })
                  .json({ msg: "success!", user: userInfo, newJWT });
              } else {
                res.status(401).json({ msg: "invalid login attempt" });
              }
            })
            .catch((err) => {
              console.log("Error comparing passwords:", err); // Verificar errores al comparar contraseñas
              res
                .status(401)
                .json({ msg: "invalid login attempt", error: err });
            });
        }
      })
      .catch((err) => {
        console.log("Error finding user:", err); // Verificar errores al buscar usuario
        res.status(401).json({ error: err });
      });
  },
};
