import express from "express";
import userController from "../controllers/user.controllers.js";

const { getAllUsers, getUserById, addUser, updateUser, deleteUser } = userController

const router = express.Router();

router
  .route("/users")
  .get(getAllUsers)
  .post(addUser);

router
  .route("/users/:userId")
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

export default router;
