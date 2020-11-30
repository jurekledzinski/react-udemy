const express = require("express");
const router = express.Router();
const passport = require("passport");

const { sessionizeUser } = require("../utils/helpers");

router.get("/", (req, res) => {
  console.log(res.locals.error);
  res.send(res.locals.error);
});

//teraz musimy użyc naszego passport

router.post("/", (req, res, next) => {
  const { email, password } = req.body;
  const info = {
    alert: "",
  };
  if ((!email && !password) || !email || !password) {
    info.alert = "Please fill in all fields";
    return res.status(400).json(info);
  }
  const info1 = {
    alert: "We are sorry, we have server issue, please try later!",
  };

  passport.authenticate("local", (err, user) => {
    if (err) {
      info1.alert = "We are sorry, we have server issue, please try later!";
      return res.status(500).json(info1);
    }

    if (!user) {
      info1.alert = "User isn't registered!";
      return res.status(404).json(info1);
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      const info2 = {
        success: "You are logged!",
        user: user.name,
        userId: user._id,
        role: user.role,
      };

      const sessionUser = sessionizeUser(user);
      req.session.person = sessionUser;

      return res.status(200).json(info2);
    });
  })(req, res, next);
});

module.exports = router;
