import router from "./index.js";
import {
  login,
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";

router.route("/login").post(login);

router.route("/users").get(getUsers).post(addUser);

router
  .route("/users/:userId")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
