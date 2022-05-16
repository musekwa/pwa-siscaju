import FarmDivision from "../models/farmDivision.model.js";
import _ from "lodash";
import mongoose from "mongoose";
import Farmland from "../models/farmland.model.js";
import {
  getDivisionsService,
  getOneDivisionService,
  addDivisionService,
  updateDivisionService,
  deleteDivisionService,
} from "../services/farmDivision.services.js";

const ObjectId = mongoose.Types.ObjectId;

// registering a new farmDivision by farmland's id
// duplicates not being allowed
const addDivision = async (req, res) => {
  const {
    body,
    params: { farmlandId },
  } = req;

  try {
    if (!farmlandId) {
      return res.status(400).send({
        status: "FAILED",
        message: "Deve especificar o 'farmlandId' do pomar",
      });
    }

    let farmland = await addDivisionService(farmlandId, body);
    return res.status(200).send({
      status: "OK",
      data: farmland,
    });
  } catch (error) {
    return res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};

// get farmland divisions by farmland's id
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
      foundDivisions = await getOneDivisionService(
        farmlandId,
        divisionId
      );
    }
    return res.status(200).send({
      status: "OK",
      data: foundDivisions,
    });
  } catch (error) {
    return res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};

// update an already-registered farmDivision
const updateDivision = async (req, res) => {
  const {
    body,
    params: { farmlandId },
    query: { divisionId },
  } = req;
  if (farmlandId && divisionId) {
    try {
      let updatedDivision = await updateDivisionService(
        divisionId,
        body
      );
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
    return res.status(400).send({
      status: "FAILED",
      message: "Deve especificar 'farmlandId' e 'divisionId'",
    });
  }
};

// delete a registered farmDivision
const deleteDivision = async (req, res) => {
  const {
    params: { farmlandId },
    query: { divisionId },
  } = req;
  try {
    let deletionResult = await deleteDivisionService(farmlandId, divisionId);
    return res.status(204).send({ status: "OK", message: "Subdivisao liminada com sucesso" });
  } catch (error) {
    return res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};

export {
  addDivision,
  getDivisions,
  updateDivision,
  deleteDivision,
};
