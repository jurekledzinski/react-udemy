var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.render("layout")
});

router.get("/homepage", (req, res) => {
  res.render("homepage")
});

module.exports = router;
