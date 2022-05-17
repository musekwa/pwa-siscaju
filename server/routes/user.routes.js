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

router.post("/login", body("email").isEmail(), body("password").isLength({ min: 6 }), login);

router.route("/users").get(getUsers).post(addUser);

router
  .route("/users/:userId")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
