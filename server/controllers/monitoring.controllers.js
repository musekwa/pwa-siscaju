import _ from "lodash";
import mongoose from "mongoose";
import Monitoring from "../models/monitoring.model.js";

const ObjectId = mongoose.Types.ObjectId;

// register a new farmland
const addMonitoring = async (req, res) => {
  const monitoring = new Monitoring(req.body);
  try {
    await monitoring.save();
    return res.status(200).json(monitoring);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// list all registered farmlands
const getAllMonitorings = async (req, res) => {
  let monitorings;

  try {
    monitorings = await Monitoring.find({}, "label geocoordinates");
    return res.status(200).json(monitorings);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// update an already-registered farmland
const updateMonitoring = async (req, res) => {
  const monitoringId = req.params.monitoringId;
  const { label, geocoordinates } = req.body;

  try {
    let monitoring = await Monitoring.findOneAndUpdate(
      { _id: ObjectId(monitoringId) },
      { label, geocoordinates },
      { runValidators: true, new: true }
    );

    return res.status(200).json(monitoring);
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

// delete a registered farmland
const deleteMonitoring = async (req, res) => {
  const monitoringId = req.params.monitoringId;
  try {
    let monitoring = await Monitoring.deleteOne({
      _id: ObjectId(monitoringId),
    });
    return res.status(200).json({
      message: "A monitoria foi eliminada com sucesso",
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

export default {
  addMonitoring,
  getAllMonitorings,
  updateMonitoring,
  deleteMonitoring,
};
