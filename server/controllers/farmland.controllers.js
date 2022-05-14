import _ from "lodash";
import mongoose from "mongoose";
import Farmer from "../models/farmer.model.js";
import Farmland from "../models/farmland.model.js";
import {
  getFarmlandsByFarmerIdService,
  addFarmlandService,
  getFarmlandsService,
  getOneFarmlandByFarmerIdService,
  updateFarmlandService,
  deleteFarmlandService,
} from "../services/farmland.services.js";

const ObjectId = mongoose.Types.ObjectId;

// create a new farmland by farmer (farmerId)
const addFarmland = async (req, res) => {
  const {
    body,
    query: { farmerId },
  } = req;

  if (!farmerId || !body) {
    res.status(400).send({
      status: "FAILED",
      message:
        "Algo foi esquecido: ou o parametro 'farmerId' ou dados do pomar (body)",
    });
  }
  try {
    let savedFarmland = await addFarmlandService(farmerId, body);
    res.status(201).send({
      status: "OK",
      data: { farmer: savedFarmland.farmer, farmland: savedFarmland.farmland },
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};

// list registered farmlands by passed queries
const getFarmlands = async (req, res) => {
  const {
    query: { farmerId, farmlandId },
  } = req;
 
  try {
    let farmlands;
    if (!farmerId && !farmlandId) {  // get all registered farmlands
      farmlands = await getFarmlandsService();
    } else if (farmerId && !farmlandId) { // get all farmlands belonging to the farmerId's owner
      farmlands = await getFarmlandsByFarmerIdService(farmerId)
    }
    else if (farmerId && farmlandId){ // get one farmland by farmlandId and farmerId
      farmlands = await getOneFarmlandByFarmerIdService(farmerId, farmlandId);
    }
    if (!farmlands) {
      res.status(404).send({
        status: "NOT FOUND",
        message: "Pomares nao encontrados!",
      });
    }
    return res.status(200).send({
      status: "OK",
      data: farmlands,
    });
  } catch (error) {
    return res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};


// update an already-registered farmland
const updateFarmland = async (req, res) => {
  const {
    body,
    query: { farmerId, farmlandId },
  } = req;

  if (!farmerId || !farmlandId) {
    res.status(400).send({
      status: "FAILED",
      message: "Deve especificar ':farmerId' e ':farmlandId'",
    });
  }

  try {
    let updatedFarmland = await updateFarmlandService(
      farmerId,
      farmlandId,
      body
    );
    if (!updatedFarmland) {
      res.status(404).send({
        status: "NOT FOUND",
        message: "Pomar nao econtrado",
      });
    }

    res.status(200).send({ status: "OK", data: updatedFarmland });
  } catch (error) {
    return res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};

// delete a registered farmland
const deleteFarmland = async (req, res) => {
  const {
    query: { farmerId, farmlandId },
  } = req;

  if (!farmerId || !farmlandId) {
    res.status(400).send({
      status: "FAILED",
      message: "Deve especificar 'farmerId' e 'farmlandId'",
    });
    return ;
  }

  try {
    let deletionResult = await deleteFarmlandService(farmerId, farmlandId);
    res.status(204).send(deletionResult);
    return ;
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      message: error?.message || error,
    });
  }
};

export {
  addFarmland,
  getFarmlands,
  updateFarmland,
  deleteFarmland,
};
