import FarmDivision from "../models/farmDivision.model.js";
import mongoose from "mongoose";
import Farmland from "../models/farmland.model.js";

const ObjectId = mongoose.Types.ObjectId;

const getFarmDivisionService = async (farmlandId) => {
  try {
    let divisions = await FarmDivision.find({ farmland: ObjectId(farmlandId) });
    if (!divisions) {
      return {
        status: 404,
        message: "Subdivisoes nao encontradas!",
      };
    }
    return divisions;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const addFarmDivisionService = async (farmlandId, body) => {
  try {
    let farmland = await Farmland.findById(ObjectId(farmlandId));
    if (!farmland) {
      return {
        status: 404,
        message: "Este pomar nao existe",
      };
    }
    let farmDivision = new FarmDivision(body);
    farmDivision.farmland = farmland;
    farmland.farmDivisions.push(farmDivision);
    await farmDivision.save();
    await farmland.save();
    return farmland;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const getOneFarmDivisionService = async (farmlandId, divisionId) => {
  try {
    let farmDivision = await FarmDivision.find({
      farmland: ObjectId(farmlandId),
      _id: ObjectId(divisionId),
    });
    if (!farmDivision) {
      return {
        status: 404,
        message: "Esta subdivisao de pomar nao existe",
      };
    }

    return farmDivision;
  } catch (error) {
    throw {
      status: 500,
      message: err.message || error,
    };
  }
};

const updateFarmDivisionService = async (divisionId, body) => {
  try {
    let updatedFarmDivision = await FarmDivision.findOneAndUpdate(
      { _id: ObjectId(divisionId) },
      body,
      { runValidators: true, new: true }
    );
    return updatedFarmDivision;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const deleteFarmDivisionService = async (farmlandId, divisionId) => {
  try {
    await FarmDivision.deleteOne({
      _id: ObjectId(divisionId),
      farmland: ObjectId(farmlandId),
    });
    let farmland = await Farmland.findById(farmlandId);
    const divisionIndex = farmland.farmDivisions.indexOf(divisionId);
    if (!farmland || divisionIndex == -1) {
      return { status: "OK", message: "Subdivisao nao existente!" };
    }

    farmland.farmDivisions.splice(divisionIndex, 1);
    await farmland.save();
    return { status: "OK", message: "Subdivisao foi eliminada com sucesso" };
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

export {
  getFarmDivisionService,
  addFarmDivisionService,
  getOneFarmDivisionService,
  updateFarmDivisionService,
  deleteFarmDivisionService,
};
