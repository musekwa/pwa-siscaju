import express from "express";
import farmerController from "../controllers/farmer.controllers.js";

const {
  addFarmer,
  getAllFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer,
  // getFarmerAndFarmlands,
} = farmerController;

const router = express.Router();

router
  .route("/farmers")
  .get(getAllFarmers)
  .post(addFarmer);

router
  .route("/farmers/:farmerId")
  .get(getFarmerById)
  .put(updateFarmer)
  .delete(deleteFarmer);

export default router;
