import router from "./index.js";
import { getMonitorings, addMonitoring, updateMonitoring, deleteMonitoring } from "../controllers/monitoring.controllers.js";

router
  .route("/monitorings")
  .get(getMonitorings)
  .post(addMonitoring);

router
  .route("/monitorings/:monitoringId")
  .put(updateMonitoring)
  .delete(deleteMonitoring);

export default router;
