const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//Load user model

const User = require("../models/registration.model");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Sprawdzenie czy istnieje email w bazie
      User.findOne({ email: email }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: "That email is not registered" });
        }

        //spradzenie czy hasło pasuje, musimy uzyc bcrypt poniewaz haslo zapisane jest z hasowane a haslo wyslane jest z login form
        //jest bez hash, nalezy je teraz porównać, password to te wyslane z form login a username.password to te w bazie danych
        //isMatch jesli pasują do siebie wywolujemy done(null,user) i zwracamy tego usera
        // jesli nie pasuje wywolujemy done(null,false,{message: 'Incorrect password'})

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Incorrect password" });
          }
        });
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};
