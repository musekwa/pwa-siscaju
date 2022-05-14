import router from "./index.js";
import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controllers.js";

router
  .route("/users")
  .get(getUsers)
  .post(addUser);

router
  .route("/users/:userId")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
