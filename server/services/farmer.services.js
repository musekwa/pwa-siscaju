import mongoose from "mongoose";
import Farmer from "../models/farmer.model.js";

const ObjectId = mongoose.Types.ObjectId;

const getFarmersService = async () => {
  try {
    let farmers = await Farmer.find({});
    if (!farmers) {
      return {
        status: 404,
        message: "Nenhum produtor encontrado"
      }
    }
    return farmers;
  } catch (error) {
    throw {
      status: 500,
      message: { error: error?.message || error },
    };
  }
};

const addFarmerService = async (farmer) => {
  const newFarmer = new Farmer(farmer);
  try {
    const savedFarmer = await newFarmer.save();
    return savedFarmer;
  } catch (error) {
    throw {
      status: 500,
      message: { error: error?.message || error },
    };
  }
};

const getFarmerByIdService = async (farmerId) => {
  try {
    const foundFarmer = await Farmer.findById(ObjectId(farmerId)).populate(
      "farmlands"
    );
    if (!foundFarmer) {
      return {
        status: 404,
        message: "Este produtor nao existe",
      }
    }
    return foundFarmer;
  } catch (error) {
    throw {
      status: 500,
      message: { error: error?.message || error },
    };
  }
};

const updateFarmerService = async (farmerId, body) => {
  try {
    let updatedFarmer = await Farmer.findOneAndUpdate(
      { _id: ObjectId(farmerId) },
      body,
      { runValidators: true, new: true }
    );
    if (!updatedFarmer) {
      return {
        status: 404,
        message: "Este produtor nao existe",
      }
    }
    return updatedFarmer;
  } catch (error) {
    throw {
      status: 500,
      message: { error: error?.message || error },
    };
  }
};

const deleteFarmerService = async (farmerId) => {
  try {
    let deletionResult = await Farmer.deleteOne({
      _id: ObjectId(farmerId),
    });
    return deletionResult;
  } catch (error) {
    throw {
      status: 500,
      message: { error: error?.message || error },
    };
  }
};



export {
  getFarmersService,
  addFarmerService,
  getFarmerByIdService,
  updateFarmerService,
  deleteFarmerService,
};
