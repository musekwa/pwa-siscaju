import mongoose from "mongoose";
import Monitoring from "../models/monitoring.model.js";
import FarmDivision from "../models/farmDivision.model.js";

const ObjectId = mongoose.Types.ObjectId;

const createOrUpdateMonitoringService = async (query, body) => {
  try {
    let division = await FarmDivision.findById(query.division);
    if (!division) {
      return {
        status: 404,
        message: "Subdivisao nao encontrada!",
      };
    }

    let options = {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    };

    // monitoring.FarmDivision = division;
    let monitoring = await Monitoring.findOneAndUpdate(query, body, options);
    console.log("monitoring: ", monitoring);
    // let savedMonitoring = await monitoring.save();
    // console.log("monitoring:", savedMonitoring);
    return monitoring;
  } catch (error) {
    throw { status: "FAILED", message: error?.message || error };
  }
};

export { createOrUpdateMonitoringService };
