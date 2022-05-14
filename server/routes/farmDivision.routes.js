import express from "express";
import {
  getFarmDivisions,
  addFarmDivision,
  updateFarmDivision,
  deleteFarmDivision,
} from "../controllers/farmDivision.controllers.js";

const router = express.Router();

router
  .route("/farmlands/:farmlandId/divisions")
  .get(getFarmDivisions)
  .post(addFarmDivision)
  .patch(updateFarmDivision)
  .delete(deleteFarmDivision);

export default router;
