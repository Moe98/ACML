const validator = require("../validations/userValidations");
const mongoValidator = require("validator");
const bcrypt = require("../routes/api/utils/encryption.js");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const tokenKey = require("../config/keys_dev").secretOrKey;

const User = require("../models/User");

// get user
exports.getUser = async function(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(404).send({ error: "user does not exist" });
    res.send({ data: user });
  } catch (error) {
    res.status(404).send({ error: "user does not exist" });
  }
};
// create user

async function checkUniqueEmail(email) {
  const existingUser = await User.findOne({ email: email });
  if (existingUser) return false;

  return true;
}

exports.createUser = async function(req, res) {
  try {
    const isValidated = validator.createValidation(req.body);
    if (isValidated.error) {
      res.status(400).send({ error: isValidated.error.details[0].message });
      return;
    }
    const isUniqueEmail = await checkUniqueEmail(req.body.email);
    if (!isUniqueEmail)
      return res
        .status(400)
        .send({ error: `email ${req.body.email} is already taken!` });
    req.body.password = bcrypt.hashPassword(req.body.password);
    const newUser = await User.create(req.body);
    res.send({ msg: "User was created successfully", data: newUser });
  } catch (error) {
    res.status(400).send({ error: "Something went wrong" });
  }
};

// update user  password only
exports.updateUser = async function(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(404).send({ error: "user does not exist" });
      return;
    }
    if (!req.body.password) {
      req.body.password = user.password;
    } else {
      req.body.password = bcrypt.hashPassword(req.body.password);
    }
    const email = user.email;
    const username = user.username;
    const password = req.body.password;
    const favoriteArticles = user.favoriteArticles;
    const favoriteAuthors = user.favoriteAuthors;
    const isValidated = validator.updateValidation(req.body);
    if (isValidated.error) {
      res.status(400).send({ error: isValidated.error.details[0].message });
      return;
    }
    await User.findByIdAndUpdate(id, {
      email,
      password,
      username,
      favoriteArticles,
      favoriteAuthors
    });
    res.send({ msg: "user updated successfully" });
  } catch (error) {
    res.status(404).send({ error: "user does not exist" });
  }
};
// delete User
exports.deleteUser = async function(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(404).send({ error: "user does not exist" });
      return;
    }
    const deletedUser = await User.findByIdAndRemove(id);
    res.send({ msg: "user was deleted successfully", data: deletedUser });
  } catch (error) {
    res.status(404).send({ error: "user does not exist" });
  }
};
