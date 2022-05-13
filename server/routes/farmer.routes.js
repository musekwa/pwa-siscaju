import router from "./index.js";
import farmerController from "../controllers/farmer.controllers.js";
import farmlandController from "../controllers/farmland.controllers.js";

const {
  addFarmer,
  getAllFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer,
} = farmerController;


router.route("/farmers").get(getAllFarmers).post(addFarmer);

router
  .route("/farmers/:farmerId")
  .get(getFarmerById)
  .patch(updateFarmer)
  .delete(deleteFarmer);




export default router;
