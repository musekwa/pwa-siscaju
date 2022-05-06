import express from "express";
import farmlandController from "../controllers/farmland.controllers.js";
import farmDivisionController from "../controllers/farmDivision.controllers.js";

const {
  getAllFarmlands,
  getFarmlandById,
  getFarmlandsByFarmerId,
  addFarmland,
  updateFarmland,
  deleteFarmland,
} = farmlandController;

const {
  getFarmlandDivisions,
  getFarmlandDivision,
  addFarmlandDivision,
  updateFarmlandDivision,
  deleteFarmlandDivision,
} = farmDivisionController;

const router = express.Router();

// retriving all the farmlands
router.route("/farmlands").get(getAllFarmlands);

/**
 * Creating a farmland is by farmer's id
 * retrieving farmlands by farmer's id
 * */
router
  .route("/farmlands/:farmerId")
  .get(getFarmlandsByFarmerId)
  .post(addFarmland);

router.route("/farmlands/:farmlandId").get(getFarmlandById);

/**
 * Updating and deleting a farmland is only allowed
 * if both the owner (farmer)'s and farmland's ids
 * are provided!
 */
router
  .route("/farmlands/:farmlandId/:farmerId")
  .put(updateFarmland)
  .delete(deleteFarmland);

router
  .route("/farmlands/:farmlandId/divisions")
  .get(getFarmlandDivisions)
  .post(addFarmlandDivision);

router
  .route("/farmlands/:farmlanId/divisions/:divisionId")
  .get(getFarmlandDivision)
  .patch(updateFarmlandDivision)
  .delete(deleteFarmlandDivision);

export default router;
