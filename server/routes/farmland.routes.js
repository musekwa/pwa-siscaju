import router from "./index.js";
import {
  getFarmlands,
  addFarmland,
  getFarmlandById,
  updateFarmland,
  deleteFarmland,
} from "../controllers/farmland.controllers.js";

router
  .route("/farmlands")
  .get(getFarmlands)
  .post(addFarmland)

router
  .route("/farmlands/:farmlandId")
  .get(getFarmlandById)
  .patch(updateFarmland)
  .delete(deleteFarmland);

export default router;
