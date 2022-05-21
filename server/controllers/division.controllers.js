import Division from "../models/division.model.js";
import _ from "lodash";
import mongoose from "mongoose";
import Farmland from "../models/farmland.model.js";
import {
  getDivisionsService,
  getOneDivisionService,
  addDivisionService,
  updateDivisionService,
  deleteDivisionService,
} from "../services/division.services.js";

const ObjectId = mongoose.Types.ObjectId;

//@desc 
//@route 
//@access
// duplicates not being allowed
const addDivision = async (req, res) => {
  const {
    body,
    params: { farmlandId },
  } = req;

  try {
    if (!farmlandId) {
      res.status(400);
      throw new Error("Deve especificar o 'farmlandId' do pomar");
    }

    let farmland = await addDivisionService(farmlandId, body);
    return res.status(200).send({
      status: "OK",
      data: farmland,
    });
  } catch (error) {
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

//@desc 
//@route 
//@access
const getDivisions = async (req, res) => {
  const {
    params: { farmlandId },
    query: { divisionId },
  } = req;
  try {
    let foundDivisions;
    if (farmlandId && !divisionId) {
      foundDivisions = await getDivisionsService(farmlandId);
    } else if (farmlandId && divisionId) {
      foundDivisions = await getOneDivisionService(farmlandId, divisionId);
    }
    return res.status(200).send({
      status: "OK",
      data: foundDivisions,
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
const updateDivision = async (req, res) => {
  const {
    body,
    params: { farmlandId },
    query: { divisionId },
  } = req;
  if (farmlandId && divisionId) {
    try {
      let updatedDivision = await updateDivisionService(divisionId, body);
      return res.status(200).send({
        status: "OK",
        data: updatedDivision,
      });
    } catch (error) {
      return res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: error?.error || error },
      });
    }
  } else {
    // return res.status(400).send({
    //   status: "FAILED",
    //   message: "Deve especificar 'farmlandId' e 'divisionId'",
    // });
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

//@desc 
//@route 
//@access
const deleteDivision = async (req, res) => {
  const {
    params: { farmlandId },
    query: { divisionId },
  } = req;
  try {
    let deletionResult = await deleteDivisionService(farmlandId, divisionId);
    return res
      .status(204)
      .send({ status: "OK", message: "Subdivisao liminada com sucesso" });
  } catch (error) {
    // return res.status(error?.status || 500).send({
    //   status: "FAILED",
    //   data: { error: error?.error || error },
    // });
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

export { addDivision, getDivisions, updateDivision, deleteDivision };
