import _ from "lodash";
import mongoose from "mongoose";
import Farmer from "../models/farmer.model.js";
import Farmland from "../models/farmland.model.js";
import {
  getFarmlandsByFarmerIdService,
  addFarmlandService,
  getFarmlandsService,
  getOneFarmlandByFarmerIdService,
  getFarmlandByFarmlandIdService,
  updateFarmlandService,
  deleteFarmlandService,
} from "../services/farmland.services.js";

const ObjectId = mongoose.Types.ObjectId;

//@desc
//@route
//@access
const addFarmland = async (req, res) => {
  const {
    body,
    query: { farmerId },
    user,
  } = req;

  if (!farmerId || !body) {
    res.status(400);
    throw new Error(
      "Deve indicar ou o parametro 'farmerId' ou dados do pomar!"
    );
  }
  try {
    let savedFarmland = await addFarmlandService(user.id, farmerId, body);
    return res.status(201).send({
      status: "OK",
      data: { farmer: savedFarmland.farmer, farmland: savedFarmland.farmland },
    });
  } catch (error) {
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

//@desc
//@route
//@access
const getFarmlands = async (req, res) => {
  const {
    query: { farmerId, farmlandId },
    user,
  } = req;

  try {
    let farmlands;
    if (!farmerId && !farmlandId) {
      // get all registered farmlands
      farmlands = await getFarmlandsService();
    } else if (farmerId && !farmlandId) {
      // get all farmlands belonging to the farmerId's owner
      farmlands = await getFarmlandsByFarmerIdService(farmerId);
    } else if (farmerId && farmlandId) {
      // get one farmland by farmlandId and farmerId
      farmlands = await getOneFarmlandByFarmerIdService(farmerId, farmlandId);
    }
    if (!farmlands) {
      return res.status(404).send({
        status: "NOT FOUND",
        message: "Pomares nao encontrados!",
      });
    }
    return res.status(200).send({
      status: "OK",
      data: farmlands,
    });
  } catch (error) {
    // return res.status(error?.status || 500).send({
    //   status: "FAILED",
    //   data: { error: error?.error || error },
    // });
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

//@desc
//@route
//@access
const getFarmlandById = async (req, res) => {
  const {
    params: { farmlandId },
  } = req;
  try {
    let foundFarmland = await getFarmlandByFarmlandIdService(farmlandId);
    return res.status(200).send({ status: "OK", data: foundFarmland });
  } catch (error) {
    // return res.status(error?.status || 500).send({
    //   status: "FAILED",
    //   data: { error: error?.error || error },
    // });
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

//@desc
//@route
//@access
const updateFarmland = async (req, res) => {
  const {
    body,
    params: { farmlandId },
  } = req;

  if (!farmlandId) {
    // return res.status(400).send({
    //   status: "FAILED",
    //   message: "Deve especificar ':farmerId' e ':farmlandId'",
    // });
    res.status(400);
    throw new Error("Deve especificar 'farmerId' e 'farmlandId'");
  }

  try {
    let updatedFarmland = await updateFarmlandService(farmlandId, body);
    if (!updatedFarmland) {
      return res.status(404).send({
        status: "NOT FOUND",
        message: "Pomar nao econtrado",
      });
    }

    return res.status(200).send({ status: "OK", data: updatedFarmland });
  } catch (error) {
    // return res.status(error?.status || 500).send({
    //   status: "FAILED",
    //   data: { error: error?.error || error },
    // });
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

//@desc
//@route
//@access
const deleteFarmland = async (req, res) => {
  const {
    params: { farmlandId },
    query: { farmerId },
  } = req;

  if (!farmerId || !farmlandId) {
    // return res.status(400).send({
    //   status: "FAILED",
    //   message: "Deve especificar 'farmerId' e 'farmlandId'",
    // });
    res.status(400);
    throw new Error("Deve especificar 'farmerId' e 'farmlandId'");
  }

  try {
    let deletionResult = await deleteFarmlandService(farmerId, farmlandId);
    return res
      .status(204)
      .send({ status: "OK", message: "Pomar eliminado", data: deletionResult });
  } catch (error) {
    // return res.status(error?.status || 500).send({
    //   status: "FAILED",
    //   message: error?.message || error,
    // });
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

export {
  addFarmland,
  getFarmlands,
  getFarmlandById,
  updateFarmland,
  deleteFarmland,
};
