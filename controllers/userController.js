const validator = require("../validations/userValidations");
const bcrypt = require("../routes/api/utils/encryption.js");
const newsURI = require("../config/keys_dev").newsURI;
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(newsURI);

const User = require("../models/User");

// get All Users
exports.getAllUsers = async function(req, res) {
  const users = await User.find();
  res.send({ data: users });
};
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
    const topicsHistory = user.topicsHistory;
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
      favoriteAuthors,
      topicsHistory
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

// Search
exports.search = async function(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(404).send({ error: "user does not exist" });
      return;
    }
    let topicsHistory = user.topicsHistory;
    let flag = true;
    for (let i = 0; i < topicsHistory.length; i++)
      if (topicsHistory[i] === req.params.searchQuery) flag = false;
    if (flag) {
      topicsHistory.push(req.params.searchQuery);
      await User.findByIdAndUpdate(id, {
        topicsHistory
      });
    }
    let date = new Date();
    let from =
      date.getFullYear() + "-" + date.getMonth() + "-" + date.getUTCDate(); // handle this more precisely
    let to =
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getUTCDate();
    try {
      newsapi.v2
        .everything({
          q: req.params.searchQuery,
          sources: "",
          domains: "",
          from: from,
          to: to,
          language: "en",
          sortBy: "relevancy",
          page: 2
        })
        .then(response => {
          res.json({ data: response });
          //console.log(response);
          /*
            {
              status: "ok",
              articles: [...]
            }
          */
        });
    } catch (error) {
      res.status(404).send({ error: "failed to search" });
    }
  } catch (error) {
    res.status(404).send({ error: "user does not exist" });
  }
};

// get Favourite Articles
exports.getFavoriteArticles = async function(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(404).send({ error: "user does not exist" });
    res.send({ data: user.favoriteArticles });
  } catch (error) {
    res.status(404).send({ error: "user does not exist" });
  }
};

// get favourite Authors
exports.getFavoriteAuthors = async function(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) return res.status(404).send({ error: "user does not exist" });
    res.send({ data: user.favoriteAuthors });
  } catch (error) {
    res.status(404).send({ error: "user does not exist" });
  }
};

// update Favourite Articles
exports.updateFavouriteArticles = async function(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(404).send({ error: "user does not exist" });
      return;
    }
    const newFavourite = req.body.link;

    var favoriteArticles = user.favoriteArticles;
    var flag = true;
    for (var i = 0; i < favoriteArticles.length; i++)
      if (favoriteArticles[i] === newFavourite) flag = false;

    if (flag) {
      favoriteArticles.push(newFavourite);

      await User.findByIdAndUpdate(id, {
        favoriteArticles
      });
    }
    res.send({ msg: "favourite article  updated successfully" });
  } catch (error) {
    res.status(404).send({ error: " does exist" });
  }
};

// update Favourite Authors
exports.updateFavouriteAuthors = async function(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      res.status(404).send({ error: "user does not exist" });
      return;
    }
    const newFavourite = req.body.author;

    var favoriteAuthors = user.favoriteAuthors;
    var flag = true;
    for (var i = 0; i < favoriteAuthors.length; i++)
      if (favoriteAuthors[i] === newFavourite) flag = false;

    if (flag) {
      favoriteAuthors.push(newFavourite);

      await User.findByIdAndUpdate(id, {
        favoriteAuthors
      });
    }
    res.send({ msg: "favourite authors  updated successfully" });
  } catch (error) {
    res.status(404).send({ error: " does exist" });
  }
};
