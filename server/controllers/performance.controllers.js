import mongoose from "mongoose";
import { getPerformanceService } from "../services/performance.services.js";

const ObjectId = mongoose.Types.ObjectId;

const getPerformances = async (req, res) => {
  const { key } = req.query;
  
  try {
    let performace = await getPerformanceService(key);
    return res.json(performace);
  } catch (error) {
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};


export  {
    getPerformances,
}