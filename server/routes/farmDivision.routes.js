import express from "express";
import farmDivisionController from "../controllers/farmDivision.controllers.js";

const {
  getFarmDivisions,
  addFarmDivision,
  updateFarmDivision,
  deleteFarmDivision,
} = farmDivisionController;

const router = express.Router();

router
  .route("/farmlands/:farmlandId/divisions")
  .get(getFarmDivisions)
  .post(addFarmDivision)
  .patch(updateFarmDivision)
  .delete(deleteFarmDivision);

export default router;
