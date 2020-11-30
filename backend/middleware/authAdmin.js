function isLogged(req, res, next) {
  console.log(req.isAuthenticated(), " Podczas pobierania kursów w middleware");
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(200).json("You are unauthorized!");
}

module.exports = isLogged;
