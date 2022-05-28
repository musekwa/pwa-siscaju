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
import asyncHandler from "express-async-handler";


const ObjectId = mongoose.Types.ObjectId;

//@desc 
//@route 
//@access
// duplicates not being allowed
const addDivision = asyncHandler (async (req, res) => {
  const {
    body,
    params: { farmlandId },
  } = req;

  // try {
    if (!farmlandId) {
      res.status(400);
      throw new Error("Deve especificar o 'farmlandId' do pomar");
    }

    let farmland = await addDivisionService(farmlandId, body);
    return res.status(200).json({
      status: "OK",
      data: farmland,
    });
  // } catch (error) {
  //   res.status(error?.status || 500);
  //   throw new Error(error.message);
  // }
});

//@desc 
//@route 
//@access
const getDivisions = asyncHandler (async (req, res) => {
  const {
    params: { farmlandId },
    query: { divisionId },
  } = req;
  // try {
    let foundDivisions;
    if (farmlandId && !divisionId) {
      foundDivisions = await getDivisionsService(farmlandId);
    } else if (farmlandId && divisionId) {
      foundDivisions = await getOneDivisionService(farmlandId, divisionId);
    }
    return res.status(200).json({
      status: "OK",
      data: foundDivisions,
    });
  // } catch (error) {
  //   res.status(error?.status || 500);
  //   throw new Error(error.message);
  // }
});

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
      return res.status(200).json({
        status: "OK",
        data: updatedDivision,
      });
    } catch (error) {
      res.status(error?.status || 500);
      throw new Error(error?.message || error.error || error);
    }
  } else {
    res.status(400);
    throw new Error("Deve especificar 'divisionId' e 'farmlandId'");
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
      .json({ status: "OK", message: "Subdivisao liminada com sucesso", data: deletionResult });
  } catch (error) {
    res.status(error?.status || 500);
    throw new Error(error.message);
  }
};

export { addDivision, getDivisions, updateDivision, deleteDivision };
