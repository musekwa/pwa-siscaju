import Division from "../models/division.model.js";
import mongoose from "mongoose";
import Farmland from "../models/farmland.model.js";

const ObjectId = mongoose.Types.ObjectId;

const getDivisionsService = async (farmlandId) => {
  try {
    let divisions = await Division.find({ farmland: ObjectId(farmlandId) });
    if (!divisions) {
      throw {
        status: 404,
        message: "Subdivisoes nao encontradas!",
      };
    }
    return divisions;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const addDivisionService = async (farmlandId, body) => {
  try {
    let farmland = await Farmland.findById(ObjectId(farmlandId));
    if (!farmland) {
      throw {
        status: 404,
        message: "Este pomar nao existe",
      };
    }
    let division = new Division(body);
    division.farmland = farmland;
    farmland.divisions.push(ObjectId(division._id));
    await division.save();
    await farmland.save();
    return farmland;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const getOneDivisionService = async (farmlandId, divisionId) => {
  try {
    let division = await Division.find({
      farmland: ObjectId(farmlandId),
      _id: ObjectId(divisionId),
    });
    if (!division) {
      throw {
        status: 404,
        message: "Esta subdivisao de pomar nao existe",
      };
    }

    return division;
  } catch (error) {
    throw {
      status:error?.status || 500,
      message: err.message || error,
    };
  }
};

const updateDivisionService = async (divisionId, body) => {
  try {
    let updatedDivision = await Division.findOneAndUpdate(
      { _id: ObjectId(divisionId) },
      body,
      { runValidators: true, new: true }
    );
    return updatedDivision;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

const deleteDivisionService = async (farmlandId, divisionId) => {
  try {
    await Division.deleteOne({
      _id: ObjectId(divisionId),
      farmland: ObjectId(farmlandId),
    });
    let farmland = await Farmland.findById(farmlandId);
    const divisionIndex = farmland.divisions.indexOf(divisionId);
    if (!farmland || divisionIndex == -1) {
      throw { status: 404, message: "Subdivisao nao existente!" };
    }

    farmland.divisions.splice(divisionIndex, 1);
    await farmland.save();
    return { status: "OK", message: "Subdivisao foi eliminada com sucesso" };
  } catch (error) {
    throw { 
      status: error?.status || 500, 
      message: error?.message || error };
  }
};

export {
  getDivisionsService,
  addDivisionService,
  getOneDivisionService,
  updateDivisionService,
  deleteDivisionService,
};
