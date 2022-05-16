import router from "./index.js";
import {
  getMonitorings,
  addMonitoringByVariability,
  // updateMonitoring,
  // deleteMonitoring,
} from "../controllers/monitoring.controllers.js";

router
  .route("/monitorings")
  .get(getMonitorings) // get by divisionId and year as query values
  .post(addMonitoringByVariability);

router
  .route("/monitorings/:monitoringId")
  // .patch(updateMonitoring)
  // .delete(deleteMonitoring); 

export default router;
