import router from "./index.js";
import userController from "../controllers/user.controllers.js";

const { getAllUsers, getUserById, addUser, updateUser, deleteUser } = userController

router
  .route("/users")
  .get(getAllUsers)
  .post(addUser);

router
  .route("/users/:userId")
  .get(getUserById)
  .patch(updateUser)
  .delete(deleteUser);

export default router;
