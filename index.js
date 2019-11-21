const express = require("express");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
//Require Route Handlers

const app = express();

app.use(cors());

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//Connect flash
app.use(flash());

//Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

//Use Route Handlers

//production mode
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  //Homepage
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")));
} else {
  app.get("/", (req, res) => res.send("Homepage"));
}

// Handling 404
app.use((req, res) => {
  res.status(404).send({ err: "We can not find what you are looking for" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
