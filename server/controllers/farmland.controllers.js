import _ from "lodash";
import mongoose from "mongoose";
import Farmer from "../models/farmer.model.js";
import Farmland from "../models/farmland.model.js";

const ObjectId = mongoose.Types.ObjectId;

/**
 * 1. registering a new farmland;
 * 2. pushing the farmland's id to the farmer's farmland property
 * 3. referencing the farmer in the farmland's document
 */
const addFarmland = async (req, res) => {

  const farmerId = ObjectId(req.params.farmerId);
  let farmland = new Farmland(req.body);

  try {
    let farmer = await Farmer.findById(farmerId);
    if (!farmer){
      return res.json({ message: "Este produtor nao existe"})
    }

    farmer.farmlands.push(farmland)
    farmer = await farmer.save()
    farmland.farmer = farmer
    farmland = await farmland.save()
    return res.status(200).json(farmer)
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

// get all the farmer's farmlands by farmerId
const getFarmlandsByFarmerId = async (req, res) => {
  const farmerId = ObjectId(req.params.farmerId);

  try {
    const farmlands = await Farmland.find({ farmer: (farmerId)});
    return res.status(200).json(farmlands);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// get a famrland by Id and its subdivisions
const getFarmlandById = async (req, res) => {
  let farmland;
  const farmlandId = ObjectId(req.params.farmlandId);
  try {
    farmland = await Farmland.findById(farmlandId).populate('farmDivisions');
    return res.status(200).json(farmland);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// list all registered farmlands
const getAllFarmlands = async (req, res) => {
  let farmlands;

  try {
    farmlands = await Farmland.find({}, "label geocoordinates");
    return res.status(200).json(farmlands);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// update an already-registered farmland
const updateFarmland = async (req, res) => {
  const farmlandId = req.params.farmlandId;
  const { label, geocoordinates } = req.body;

  try {
    let farmland = await Farmland.findOneAndUpdate(
      { _id: ObjectId(farmlandId) },
      { label, geocoordinates },
      { runValidators: true, new: true }
    );

    return res.status(200).json(farmland);
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

// delete a registered farmland
const deleteFarmland = async (req, res) => {
  const farmlandId = req.params.farmlandId;
  try {
    let farmland = await Farmland.deleteOne({ _id: ObjectId(farmlandId) });
    return res.status(200).json({
      message: "O pomar foi eliminado com sucesso",
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

export default {
  addFarmland,
  getFarmlandsByFarmerId,
  getFarmlandById,
  getAllFarmlands,
  updateFarmland,
  deleteFarmland,
};
