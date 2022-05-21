import mongoose from "mongoose";
import { getPerformanceService } from "../services/performance.services.js";

const ObjectId = mongoose.Types.ObjectId;

const getPerformances = async (key) => {
  try {
    let performace = await getPerformanceService(key);
    return performace;
  } catch (error) {
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};


export  {
    getPerformances,
}