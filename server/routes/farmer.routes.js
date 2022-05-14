import router from "./index.js";
import {
  addFarmer,
  getFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer,
} from "../controllers/farmer.controllers.js";

router.route("/farmers").get(getFarmers).post(addFarmer);

router
  .route("/farmers/:farmerId")
  .get(getFarmerById)
  .patch(updateFarmer)
  .delete(deleteFarmer);



export default router;
