import router from "./index.js";
import monitoringController from "../controllers/monitoring.controllers.js";

router
  .route("/monitorings")
  .get(monitoringController.getAllMonitorings)
  .post(monitoringController.addMonitoring);

router
  .route("/monitorings/:monitoringId")
  .put(monitoringController.updateMonitoring)
  .delete(monitoringController.deleteMonitoring);

export default router;
