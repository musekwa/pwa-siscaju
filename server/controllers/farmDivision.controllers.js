import FarmDivision from "../models/farmDivision.model.js";
import _ from "lodash";
import mongoose from "mongoose";
import Farmland from "../models/farmland.model.js";
import farmDivisionServices from "../services/farmDivision.services.js";

const ObjectId = mongoose.Types.ObjectId;

const {
  getFarmDivisionService,
  getOneFarmDivisionService,
  addFarmDivisionService,
  updateFarmDivisionService,
  deleteFarmDivisionService,
} = farmDivisionServices;

// registering a new farmDivision by farmland's id
// duplicates not being allowed
const addFarmDivision = async (req, res) => {
  const {
    body,
    params: { farmlandId },
  } = req;

  try {
    if (!farmlandId) {
      res.status(400).send({
        status: "FAILED",
        message: "Deve especificar o 'farmlandId' do pomar",
      });
      return;
    }

    let farmland = await addFarmDivisionService(farmlandId, body);
    res.status(200).send({
      status: "OK",
      data: farmland,
    });
    return;
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
    return;
  }
};

// get farmland divisions by farmland's id
const getFarmDivisions = async (req, res) => {
  const {
    params: { farmlandId },
    query: { divisionId },
  } = req;
  try {
    let foundFarmDivisions;
    if (farmlandId && !divisionId) {
      foundFarmDivisions = await getFarmDivisionService(farmlandId);
    } else if (farmlandId && divisionId) {
      foundFarmDivisions = await getOneFarmDivisionService(
        farmlandId,
        divisionId
      );
    }
    res.status(200).send({
      status: "OK",
      data: foundFarmDivisions,
    });
    return;
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};

// update an already-registered farmDivision
const updateFarmDivision = async (req, res) => {
  const {
    body,
    params: { farmlandId },
    query: { divisionId },
  } = req;
  if (farmlandId && divisionId) {
    try {
      let updatedFarmDivision = await updateFarmDivisionService(
        divisionId,
        body
      );
      res.status(200).send({
        status: "OK",
        data: updatedFarmDivision,
      });
    } catch (error) {
      res.status(error?.status || 500).send({
        status: "FAILED",
        data: { error: error?.error || error },
      });
    }
  } else {
    res.status(400).send({
      status: "FAILED",
      message: "Deve especificar 'farmlandId' e 'divisionId'",
    });
  }
};

// delete a registered farmDivision
const deleteFarmDivision = async (req, res) => {
  const {
    params: { farmlandId },
    query: { divisionId },
  } = req;
  try {
    let deletionResult = await deleteFarmDivisionService(farmlandId, divisionId);
    return res.status(200).json(deletionResult);
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};

export default {
  addFarmDivision,
  getFarmDivisions,
  updateFarmDivision,
  deleteFarmDivision,
};
