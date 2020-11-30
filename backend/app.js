const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
// const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);

require("dotenv").config();

//Passport config

require("./config/passport")(passport);

const {
  ATLAS_URL,
  NODE_ENV,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
} = process.env;

mongoose.connect(ATLAS_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Baza danych połączona");
});

// app.use("/", require("./routes/index"));
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const coursesRouter = require("./routes/courses");
const registrationRouter = require("./routes/registration");
const userLoginLogout = require("./routes/userLoginLogout");
const usersRegistered = require("./routes/users");
const cart = require("./routes/cart");

var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//express session

app.use(
  session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      collection: "session",
      // ttl: 1000 * 60 * 3,
    }),
    cookie: {
      maxAge: 1000 * 60 * 40,
      secure: NODE_ENV === "production",
      sameSite: true,
    },
  })
);

//passport middleware do initialize i sessions
app.use(passport.initialize());
app.use(passport.session());

//connect - flash messages
// app.use(flash());

//Global variables

// app.use((req, res, next) => {
//   res.locals.error = req.flash("error");
//   next();
// });

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/courses", coursesRouter);
app.use("/register", registrationRouter);
app.use("/user", userLoginLogout);
app.use("/users", usersRegistered);
app.use("/shopping-cart", cart);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
