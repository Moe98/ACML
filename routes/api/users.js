// Dependencies
const express = require("express");
const router = express.Router();

const userController = require("../../controllers/userController");

//Read
router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUser);

//Create
router.post("/", userController.createUser);

//Update
router.put("/:id", userController.updateUser);

//Delete
router.delete("/:id", userController.deleteUser);

//Search

router.post("/search/:id/:searchQuery", userController.search);

// get Favourite Articles
router.get("/favouriteArticles/:id", userController.getFavoriteArticles);

// update FavouriteArticles
router.put("/favouriteArticles/:id", userController.updateFavouriteArticles);

// get Favourite Authors
router.get("/favouriteAuthors/:id", userController.getFavoriteAuthors);

// update FavouriteAuthors
router.put("/favouriteAuthors/:id", userController.updateFavouriteAuthors);



module.exports = router;
