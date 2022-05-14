import _ from "lodash";
import mongoose from "mongoose";
import { addMonitoringService } from "../services/monitoring.services.js";

const ObjectId = mongoose.Types.ObjectId;

// register a new farmland
const addMonitoring = async (req, res) => {
  const { body, params: { farmlandId } } = req;
  
  try {
    let savedMonitoring = await addMonitoringService(farmlandId, body);
    res.status(200).send({ status: "OK", data: savedMonitoring });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.error || error } });
  }
};

// list all registered farmlands
const getMonitorings = async (req, res) => {
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

export { addMonitoring, getMonitorings, updateMonitoring, deleteMonitoring };
