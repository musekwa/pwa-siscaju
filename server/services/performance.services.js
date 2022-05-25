import User from "../models/user.model.js";
import Performance from "../models/performance.model.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

//
const registerFarmerService = async (userId, farmerId) => {
  try {
    let performance = await Performance.findOne({ user: userId });
    console.log("performance:", performance)
    if (!performance) {
      let newPerformace = new Performance({
        user: ObjectId(userId),
        farmers: new Array(ObjectId(farmerId)),
      });
      await newPerformace.save();
      return newPerformace;
    }
    performance.farmers.push(ObjectId(farmerId));
    await performance.save();
    return performance;
  } catch (error) {
    throw {
      status: 500,
      message: { error: error?.message || error },
    };
  }
};

const registerFarmlandService = async (userId, farmlandId) => {
  try {
    let performance = await Performance.findOne({ user: userId });
    if (!performance) {
      let newPerformace = new Performance({
        user: ObjectId(userId),
        farmlands: new Array(ObjectId(farmlandId)),
      });
      await newPerformace.save();
      return newPerformace;
    }
    performance.farmlands.push(ObjectId(farmlandId));
    await performance.save();
    return performance;
  } catch (error) {
    throw {
      status: 500,
      message: { error: error?.message || error },
    };
  }
};

const registerMonitoringService = async (userId, divisionId, monitoredVariable) => {
  try {
    let performance = await Performance.findOne({ user: userId });
    if (!performance) {
      let newPerformace = new Performance({
        user: ObjectId(userId),
        monitorings: new Array({
          name: monitoredVariable,
          division: ObjectId(divisionId),
        }),
      });
      await newPerformace.save();
      return newPerformace;
    }
    performance.monitorings.push({
      name: monitoredVariable,
      division: ObjectId(divisionId),
    });
    await performance.save();
    return performance;
  } catch (error) {
    throw {
      status: 500,
      message: { error: error?.message || error },
    };
  }
};

const getPerformanceService = async (key) => {
  try {
    if (key === "farmers") {
      return await Performance.find({}).select("farmers").populate("farmers");
    } else if (key === "farmlands") {
      return await Performance.find({})
        .select("farmlands")
        .populate("farmlands");
    } else if (key === "monitorings") {
      return await Performance.find({})
        .select("monitorings")
        .populate("monitorings");
    }
    else {
        return await Performance.find({}).populate(
          "farmers farmlands monitorings"
        );
      } 
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

export {
  registerFarmerService,
  registerFarmlandService,
  registerMonitoringService,
  getPerformanceService,
};
