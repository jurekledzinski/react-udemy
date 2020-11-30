const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Person = require("../models/registration.model");

// const { sessionUser } = require("../utils/helpers");

router.post("/user", (req, res) => {
  const { name, email, password, password2, role } = req.body;

  let info = {
    alert: "",
    user: {
      name,
      email,
      password,
      password2,
      role,
    },
    message: "",
  };

  if (!name && !email && !password && !password2) {
    info.alert = "Please fill in all fields!";
    return res.status(404).json(info);
  }

  if (!name || !email || !password || !password2) {
    info.alert = "All fields are required to be fill in!";
    return res.status(404).json(info);
  }

  if (password !== password2) {
    info.alert = "Incorrect password, passwords don't match!";
    console.log(info.errors);
    return res.status(404).json(info);
  }

  if (info.alert) {
    console.log("Validation error message alert during registration");
  } else {
    Person.findOne(
      {
        $or: [
          {
            email: req.body.email,
          },
          {
            name: req.body.name,
          },
        ],
      },
      (err, data) => {
        if (err) {
          console.log("Błąd podczas wyszukania w bazie danych!");
          info.alert = "Server error, please try register later!";
          res.status(500).json(info);
        } else {
          if (data) {
            // info.alert = "User already exist in base!";
            // res.status(406).json(info);
            if (data.name === req.body.name) {
              info.alert = "User name already exist in base!";
              return res.status(406).json(info);
            } else {
              info.alert = "User email already exist in base!";
              return res.status(406).json(info);
            }
          } else {
            Person.countDocuments({}, function (err, count) {
              let newRegistration = [];
              if (count < 1) {
                console.log("<1");
                newRegistration.push({
                  name: req.body.name,
                  email: req.body.email,
                  password: req.body.password,
                  role: "Admin",
                });
                console.log(newRegistration);
              } else {
                newRegistration.push({
                  name: req.body.name,
                  email: req.body.email,
                  password: req.body.password,
                  role: "User",
                });
              }

              const [newUser] = newRegistration;
              const newRegisteredPerson = new Person(newUser);

              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newRegisteredPerson.password, salt, (err, hash) => {
                  if (err) throw err;
                  newRegisteredPerson.password = hash;

                  // const sessionUser = sessionUser(newRegistration);

                  newRegisteredPerson
                    .save()
                    .then((data) => {
                      const { _id, name, email, role } = data;
                      const info2 = {
                        success: "You are registered!",
                        newRegisteredPerson: {
                          _id,
                          name,
                          email,
                          role,
                        },
                      };
                      // req.session.person = sessionUser;
                      newRegistration = [];
                      return res.status(200).json(info2);
                    })
                    .catch((err) =>
                      console.log("Error during registration" + err)
                    );
                });
              });
            });
          }
        }
      }
    );
  }
});

module.exports = router;
