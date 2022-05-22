import mongoose from "mongoose";
import Farmland from "../models/farmland.model.js";
import Farmer from "../models/farmer.model.js";
import { registerFarmlandService } from "./performance.services.js";

const ObjectId = mongoose.Types.ObjectId;

const getFarmlandsService = async () => {
  try {
    let farmlands = await Farmland.find({});
    if (!farmlands) {
      throw {
        status: 404,
        message: "Nao existe pomares registados",
      };
    }
    return farmlands;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const addFarmlandService = async (userId, farmerId, body) => {
  let newFarmland = new Farmland(body);

  try {
    let foundFarmer = await Farmer.findById(ObjectId(farmerId));

    if (!foundFarmer) {
      throw {
        status: 400,
        message: "Nao pode adicionar pomar de um produtor que nao existe",
      };
    }
    foundFarmer.farmlands.push(newFarmland);
    let updatedFarmer = await foundFarmer.save();
    newFarmland.farmer = updatedFarmer;
    let updatedFarmland = await newFarmland.save();
  
    await registerFarmlandService(userId, updatedFarmland._id);
    return {
      farmer: updatedFarmer,
      farmland: updatedFarmland,
    };
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const getFarmlandsByFarmerIdService = async (farmerId) => {
  try {
    const foundFarmlands = await Farmland.find({ farmer: ObjectId(farmerId) });
    if (!foundFarmlands) {
      throw {
        status: 400,
        message: "Este produtor nao possui nenhum pomar",
      };
    }
    return foundFarmlands;
  } catch (error) {
    throw {
      status: error?.status || 500,
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
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const getFarmlandByFarmlandIdService = async (farmlandId) => {
  try {
    let foundFarmland = await Farmland.findById(ObjectId(farmlandId));
    if (!foundFarmland) {
      throw {
        status: 404,
        message: "Pomar nao encontrado!",
      };
    }
    return foundFarmland;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const updateFarmlandService = async (farmlandId, body) => {
  try {
    let updatedFarmland = await Farmland.findOneAndUpdate(
      { _id: ObjectId(farmlandId) },
      body,
      { runValidators: true, new: true }
    );
    if (!updatedFarmland) {
      throw {
        status: 404,
        message: "Pomar nao encontrado",
      };
    }

    return updatedFarmland;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const deleteFarmlandService = async (farmerId, farmlandId) => {
  try {
    let deletionResult = await Farmland.deleteOne({
      _id: ObjectId(farmlandId),
      farmer: ObjectId(farmerId),
    });

    if (!deletionResult) {
      throw {
        status: 404,
        message: "Pomar nao encontrado",
      };
    }
    let farmlandOwner = await Farmer.findById(ObjectId(farmerId));
    if (!farmlandOwner) {
      throw {
        status: 404,
        message: "Proprietario do pomar nao encontrado",
      };
    }
    farmlandOwner.farmlands = farmlandOwner.farmlands.filter(
      (id) => id !== ObjectId(farmlandId)
    );
    await farmlandOwner.save();

    return deletionResult;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export {
  addFarmlandService,
  getFarmlandsService,
  getFarmlandsByFarmerIdService,
  getOneFarmlandByFarmerIdService,
  getFarmlandByFarmlandIdService,
  updateFarmlandService,
  deleteFarmlandService,
};
