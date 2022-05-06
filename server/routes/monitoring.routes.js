import express from "express";
import monitoringController from "../controllers/monitoring.controllers.js";

const router = express.Router();

router
  .route("/monitorings")
  .get(monitoringController.getAllMonitorings)
  .post(monitoringController.addMonitoring);

router
  .route("/monitorings/:monitoringId")
  .put(monitoringController.updateMonitoring)
  .delete(monitoringController.deleteMonitoring);

export default router;
