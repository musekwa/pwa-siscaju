import mongoose from "mongoose";
import Farmer from "../models/farmer.model.js";
import Performance from "../models/performance.model.js";
import { registerFarmerService } from "./performance.services.js";

const ObjectId = mongoose.Types.ObjectId;

const getFarmersService = async () => {
  try {
    let farmers = await Farmer.find({});
    if (!farmers) {
      throw {
        status: 404,
        message: "Nenhum produtor encontrado"
      }
    }
    return farmers;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const addFarmerService = async (userId, farmer) => {
  const newFarmer = new Farmer(farmer);
  try {
    const savedFarmer = await newFarmer.save();
    await registerFarmerService(userId, savedFarmer._id)
    return savedFarmer;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const getFarmerByDistrictService = async (district) => {
  try {
    const foundFarmer = await Farmer.find({ district: { adress: { district }}}).populate(
      "farmlands"
    );
    if (!foundFarmer) {
      throw {
        status: 404,
        message: "Nao existe produtores desta provincia",
      };
    }
    return foundFarmer;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};



const getFarmerByIdService = async (farmerId) => {
  try {
    const foundFarmer = await Farmer.findById(ObjectId(farmerId)).populate(
      "farmlands"
    );
    if (!foundFarmer) {
      throw {
        status: 404,
        message: "Este produtor nao existe",
      }
    }
    return foundFarmer;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
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
      throw {
        status: 404,
        message: "Este produtor nao existe",
      }
    }
    return updatedFarmer;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
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
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};



export {
  getFarmersService,
  addFarmerService,
  getFarmerByIdService,
  getFarmerByDistrictService,
  updateFarmerService,
  deleteFarmerService,
};
