import router from "./index.js";
import {
  login,
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";
import { body } from 'express-validator'
import { protect } from "../middleware/authMiddleware.js"

router.route("/login").post(login);

router.route("/users").get(protect, getUsers).post(addUser);

router
  .route("/users/:userId")
  .get(protect, getUserById)
  .patch(protect, updateUser)
  .delete(protect, deleteUser);

export default router;
