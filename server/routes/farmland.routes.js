import router from "./index.js";
import {
  getFarmlands,
  addFarmland,
  updateFarmland,
  deleteFarmland,
} from "../controllers/farmland.controllers.js";

router
  .route("/farmlands")
  .get(getFarmlands)
  .post(addFarmland)
  .patch(updateFarmland)
  .delete(deleteFarmland)


export default router;
