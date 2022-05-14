import express from "express";
import {
  getDivisions,
  addDivision,
  updateDivision,
  deleteDivision,
} from "../controllers/farmDivision.controllers.js";

const router = express.Router();

router
  .route("/farmlands/:farmlandId/divisions")
  .get(getDivisions)
  .post(addDivision)
  .patch(updateDivision)
  .delete(deleteDivision);

export default router;
