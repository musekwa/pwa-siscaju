import router from "./index.js";
import farmlandController from "../controllers/farmland.controllers.js";

const {
  getFarmlands,
  addFarmland,
  updateFarmland,
  deleteFarmland,
} = farmlandController;


router
  .route("/farmlands")
  .get(getFarmlands)
  .post(addFarmland)
  .patch(updateFarmland)
  .delete(deleteFarmland)


export default router;
