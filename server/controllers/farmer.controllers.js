import {
  getFarmersService,
  addFarmerService,
  getFarmerByIdService,
  updateFarmerService,
  deleteFarmerService,
} from "../services/farmer.services.js";
import _ from "lodash";

// list all registered farmers
const getFarmers = async (req, res) => {
  try {
    let farmers = await getFarmersService();
    if (!farmers) {
      res.status(404).send({
        status: "NOT FOUND",
        message: "Produtores nao encontrados",
      });
    }
    res.status(200).send({
      status: "OK",
      data: farmers,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};

// register a new farmer
// Duplicates must not be allowed
const addFarmer = async (req, res) => {
  const { body } = req;
  if (!body.fullname || !body.birthDate || !body.birthPlace) {
    res.status(400).send({
      status: "FAILED",
      message:
        "Os campos de dados: fullname, birthDate e birthPlace sao obrigatorio",
    });
  }

  try {
    let savedFarmer = await addFarmerService(body);
    res.status(201).send({
      status: "OK",
      data: savedFarmer,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};

// get farmer by id with their farmlands
const getFarmerById = async (req, res) => {
  const {
    params: { farmerId },
  } = req;
  if (!farmerId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "O parametro ':farmerId' nao pode ser vazio" },
    });
  }
  try {
    const foundFarmer = await getFarmerByIdService(farmerId);
    if (!foundFarmer) {
      res.status(404).send({
        status: "NOT FOUND",
        message: "Produtor nao encontrado",
      });
    }
    res.status(200).send({
      status: "OK",
      data: foundFarmer,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};

// update an already-registered farmer
const updateFarmer = async (req, res) => {
  const {
    body,
    params: { farmerId },
  } = req;
  if (!farmerId) {
    res.status(400).send({
      status: "FAILED",
      message: "O parametro ':farmerId' nao pode ser vazio",
    });
  }

  try {
    let updatedFarmer = await updateFarmerService(farmerId, body);
    if (!updatedFarmer) {
      res.status(404).send({
        status: "NOT FOUND",
        message: "Produtor nao encontrados",
      });
    }
    res.status(200).send({
      status: "OK",
      data: updatedFarmer,
    });
  } catch (error) {
    res.status(error?.error || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};

// delete a registered farmer
const deleteFarmer = async (req, res) => {
  const {
    params: { farmerId },
  } = req;
  if (!farmerId) {
    res.status(400).send({
      status: "FAILED",
      message: "O parametro ':farmerId' nao pode ser vazio",
    });
  }
  try {
    let deletionResult = await deleteFarmerService(farmerId);
    res.status(204).send(deletionResult);
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
};


export {
  addFarmer,
  getFarmerById,
  getFarmers,
  updateFarmer,
  deleteFarmer,
};
