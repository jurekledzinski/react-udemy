const express = require("express");
const router = express.Router();

const { SESS_NAME } = process.env;

router.get("/", ({ session: { person } }, res) => {
  if (person) {
    return res.json(person);
  } else {
    return res.end();
  }
});

router.delete("/logout", ({ session }, res) => {
  const { person } = session;
  if (person) {
    session.destroy((err) => {
      if (err) throw err;
      res.clearCookie(SESS_NAME);
      return res.end("You are logged out");
    });
  } else {
    return res.status(400).json("Something went wrong");
  }
});

module.exports = router;
