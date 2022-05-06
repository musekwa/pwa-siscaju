import Farmer from "../models/farmer.model.js";
import _ from "lodash";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

// register a new farmer
// Duplicates must not be allowed
const addFarmer = async (req, res) => {
  const farmer = new Farmer(req.body);
  try {
    await farmer.save();
    return res.status(200).json(farmer);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};


// get farmer by id with their farmlands
const getFarmerById = async (req, res) => {
  const farmerId = ObjectId(req.params.farmerId);

  try {
    const farmer = await Farmer.findById(farmerId).populate("farmlands");
    return res.status(200).json(farmer);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// list all registered farmers
const getAllFarmers = async (req, res) => {
  let farmers;
  try {
    farmers = await Farmer.find(
      {},
      "fullname birthDate address.district farmlands"
    );
    return res.status(200).json(farmers);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// update an already-registered farmer
const updateFarmer = async (req, res) => {
  const farmerId = req.params.farmerId;
  const { name, address } = req.body;

  try {
    let farmer = await Farmer.findOneAndUpdate(
      { _id: ObjectId(farmerId) },
      { name, address },
      { runValidators: true, new: true }
    );

    return res.status(200).json(farmer);
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

// delete a registered farmer
const deleteFarmer = async (req, res) => {
  const farmerId = req.params.farmerId;
  try {
    let farmer = await Farmer.deleteOne({ _id: ObjectId(farmerId) });
    return res.status(200).json({
      message: "O produtor foi eliminado com sucesso",
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

export default {
  addFarmer,
  getFarmerById,
  getAllFarmers,
  updateFarmer,
  deleteFarmer,
  // getFarmerAndFarmlands,
};
