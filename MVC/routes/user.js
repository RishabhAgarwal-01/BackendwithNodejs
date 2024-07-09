const express = require("express");
const userData = require("../models/userData");
const {handleGetAllUser, handleCreateNewUser, handleGetUserWithID, handleUpdateUserWithID, handleDeleteUserWithID} = require("../controllers/userController")

const userRouter = express.Router();

//to get all the user and add new user route
userRouter.route("/")
.get(handleGetAllUser)
.post(handleCreateNewUser)

//routes with the ids
userRouter.route("/:id")
//get user with id
.get(handleGetUserWithID)
//update user with id
.patch(handleUpdateUserWithID)
//delete user with id
.delete(handleDeleteUserWithID);

module.exports= userRouter;