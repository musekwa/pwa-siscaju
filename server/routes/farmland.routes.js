import router from "./index.js";
import farmlandController from "../controllers/farmland.controllers.js";
import farmDivisionController from "../controllers/farmDivision.controllers.js";

const {
  getFarmlands,
  // getFarmlandById,
  addFarmlandByFarmerId,
  getFarmlandsByFarmerId,
  getOneFarmlandByFarmerId,
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

// retriving all the farmlands
router.route("/farmlands").get(getFarmlands);

router.route("/farmers/:farmerId/farmland").post(addFarmlandByFarmerId);

router.route("/farmers/:farmerId/farmlands").get(getFarmlandsByFarmerId);

router
  .route("/farmers/:farmerId/farmlands/:farmlandId")
  .get(getOneFarmlandByFarmerId)
  .patch(updateFarmland)
  .delete(deleteFarmland);

/**
 * Creating a farmland is by farmer's id
 * retrieving farmlands by farmer's id
 * */
// router
// .route("/farmlands/:farmerId")
// .get(getFarmlandsByFarmerId)
// .post(addFarmland);

// router
//   .route("/farmlands/:farmlandId")
//   .get(getFarmlandById);

/**
 * Updating and deleting a farmland is only allowed
 * if both the owner (farmer)'s and farmland's ids
 * are provided!
 */
// router
//   .route("/farmlands/:farmlandId/:farmerId")
//   .put(updateFarmland)
//   .delete(deleteFarmland);

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
