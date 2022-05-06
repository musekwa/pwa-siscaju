import FarmDivision from "../models/farmDivision.model.js";
import _ from "lodash";
import mongoose from "mongoose";
import Farmland from "../models/farmland.model.js";

const ObjectId = mongoose.Types.ObjectId;

// registering a new farmDivision by farmland's id
// duplicates not being allowed
const addFarmlandDivision = async (req, res) => {
  const farmlandId = ObjectId(req.params.farmlandId);
  const farmDivision = new FarmDivision(req.body);
  try {
    let farmland = await Farmland.findById(farmlandId);
    if (!farmland) {
      return res.status(404).json({
        message: "Este pomar nao existe",
      });
    }
    farmDivision.farmland = farmland;
    farmland.farmDivisions.push(farmDivision);
    await farmDivision.save();
    await farmland.save();
    return res.status(200).json(farmDivision);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// get farmland divisions by farmland's id
const getFarmlandDivisions = async (req, res) => {
  const farmlandId = ObjectId(req.params.farmlandId);
  try {
    let farmDivisions = await FarmDivision.find({ farmland: farmlandId });
    if (!farmDivisions) {
      return res.status(404).json({
        message: "Estassubdivisoes de pomar nao existem",
      });
    }

    return res.status(200).json(farmDivisions);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// get a farmland division by farmland's id
const getFarmlandDivision = async (req, res) => {
  const farmlandId = ObjectId(req.params.farmlandId);
  const divisionId = ObjectId(req.params.divisionId);
  try {
    let farmDivision = await FarmDivision.find({
      farmland: farmlandId,
      _id: divisionId,
    });
    if (!farmDivision) {
      return res.status(404).json({
        message: "Esta subdivisao de pomar nao existe",
      });
    }

    return res.status(200).json(farmDivision);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// update an already-registered farmDivision
const updateFarmlandDivision = async (req, res) => {
  const divisionId = req.params.divisionId;
  const { trees, spacing } = req.body;

  try {
    let farmDivision = await FarmDivision.findOneAndUpdate(
      { _id: ObjectId(divisionId) },
      { trees, spacing },
      { runValidators: true, new: true }
    );

    return res.status(200).json(farmDivision);
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

// delete a registered farmDivision
const deleteFarmlandDivision = async (req, res) => {
  const divisionId = req.params.divisionId;
  const farmlandId = req.params.farmlandId;
  try {
    await FarmDivision.deleteOne({
      _id: ObjectId(divisionId),
      farmland: ObjectId(farmlandId),
    });
    let farmland = await Farmland.findById(farmlandId);
    const divisionIndex = farmland.farmDivisions.indexOf(divisionId);
    if (!farmland || divisionIndex == -1) {
      return res.status(200).json({
        message: "A subdivisao foi eliminada com sucesso",
      });
    }

    farmland.farmDivisions.splice(divisionIndex, 1);
    await farmland.save();
    return res.status(200).json({
      message: "A subdivisao foi eliminada com sucesso",
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

export default {
  addFarmlandDivision,
  getFarmlandDivisions,
  getFarmlandDivision,
  updateFarmlandDivision,
  deleteFarmlandDivision,
};
