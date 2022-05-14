import mongoose from "mongoose";
import Monitoring from "../models/monitoring.model.js";

const ObjectId = mongoose.Types.ObjectId;

const addMonitoringService = async (farmlandId, body) => {
  let monitoring = new Monitoring(body);
  try {
    let savedMonitoring = await monitoring.save();
    return savedMonitoring;
  } catch (error) {
    throw { status: "FAILED", message: error?.message || error };
  }
};



export {
    addMonitoringService,
}
