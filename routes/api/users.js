// Dependencies
const express = require("express");
const router = express.Router();


const userController = require("../../controllers/userController");


//Read
router.get("/",userController.getAllUsers);

router.get("/:id",userController.getUser);

//Create
router.post('/', userController.createUser);

//Update
router.put("/:id", userController.updateUser);

//Delete
router.delete("/:id",  userController.deleteUser);


module.exports = router;