import mongoose from "mongoose";
import Farmland from "../models/farmland.model.js";
import Farmer from "../models/farmer.model.js";

const ObjectId = mongoose.Types.ObjectId;

const getFarmlandsService = async () => {
  try {
    let farmlands = await Farmland.find({});
    if (!farmlands) {
      return {
        status: 404,
        message: "Nao existe pomares registados",
      };
    }
    return farmlands;
  } catch (error) {
    throw {
      status: "FAILED",
      message: error?.message || error,
    };
  }
};

const addFarmlandByFarmerIdService = async (farmerId, body) => {
  let newFarmland = new Farmland(body);

  try {
    let foundFarmer = await Farmer.findById(ObjectId(farmerId));
    if (!foundFarmer) {
      return {
        status: 404,
        message: "Nao pode adicionar pomar de um produtor que nao existe",
      };
    }
    foundFarmer.farmlands.push(newFarmland);
    let updatedFarmer = await foundFarmer.save();
    newFarmland.farmer = updatedFarmer;
    let updatedFarmland = await newFarmland.save();
    return {
      farmer: updatedFarmer,
      farmland: updatedFarmland,
    };
  } catch (error) {
    throw {
      status: "FAILED",
      message: error?.message || error,
    };
  }
};

const getFarmlandsByFarmerIdService = async (farmerId) => {
  try {
    const foundFarmlands = await Farmland.find({ farmer: ObjectId(farmerId) });
    if (!foundFarmlands) {
      return {
        status: 404,
        message: "Este produtor nao possui nenhum pomar",
      };
    }
    return foundFarmlands;
  } catch (error) {
    throw {
      status: "FAILED",
      message: error?.message || error,
    };
  }
};

const getOneFarmlandByFarmerIdService = async (farmerId, farmlandId) => {
  try {
    let foundFarmland = await Farmland.find({
      _id: ObjectId(farmlandId),
      farmer: ObjectId(farmerId),
    });
    return foundFarmland;
  } catch (error) {
    throw {
      status: "FAILED",
      message: error?.message || error
    };
  }
};

const updateFarmlandService = () => {};

const deleteFarmlandService = () => {};

export default {
  addFarmlandByFarmerIdService,
  // addFarmlandService,
  //   getFarmlandByIdService,
  getFarmlandsService,
  getFarmlandsByFarmerIdService,
  getOneFarmlandByFarmerIdService,
  updateFarmlandService,
  deleteFarmlandService,
};
