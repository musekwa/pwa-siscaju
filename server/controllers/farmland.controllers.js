import _ from "lodash";
import mongoose from "mongoose";
import Farmland from "../models/farmland.model.js";
import farmlandServices from "../services/farmland.services.js";

const ObjectId = mongoose.Types.ObjectId;

const {
  getFarmlandsByFarmerIdService,
  addFarmlandByFarmerIdService,
  getFarmlandsService,
  getOneFarmlandByFarmerIdService,
} = farmlandServices;

// create a new farmland by farmer (farmerId)
const addFarmlandByFarmerId = async (req, res) => {
  const {
    body,
    params: { farmerId },
  } = req;

  try {
    let savedFarmland = await addFarmlandByFarmerIdService(farmerId, body);
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

// get all the farmer's farmlands by farmerId
const getFarmlandsByFarmerId = async (req, res) => {
  const {
    params: { farmerId },
  } = req;

  try {
    const foundFarmlands = await getFarmlandsByFarmerIdService(farmerId);
    if (!foundFarmlands) {
      res.status(404).send({
        status: "NOT FOUND",
        message: "Pomares nao encontrados",
      });
    }
    res.status(200).send({
      status: "OK",
      data: foundFarmlands,
    });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "OK",
      data: { error: error?.error || error },
    });
  }
};

// get a famrland by Id and its subdivisions
// const getFarmlandById = async (req, res) => {
//   console.log("getFarmland is called!");
//   // let farmland;
//   const farmlandId = ObjectId(req.params.farmlandId);
//   try {
//     const farmland = await Farmland.findById(farmlandId).populate(
//       "farmDivisions"
//     );
//     // console.log('farmland: ', farmland)
//     return res.status(200).json(farmland);
//   } catch (err) {
//     return res.status(400).json({
//       message: err.message,
//     });
//   }
// };

// list all registered farmlands
const getFarmlands = async (req, res) => {
  try {
    let farmlands = await getFarmlandsService();
    if (!farmlands) {
      res.status(404).send({
        status: "NOT FOUND",
        message: "Pomares nao encontrados!"
      })
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

const getOneFarmlandByFarmerId = async (req, res)=>{

  const { params: { farmerId, farmlandId }} = req;

  try {
    let foundFarmland = await getOneFarmlandByFarmerIdService(farmerId, farmlandId);
    if (!foundFarmland) {
      res.status(404).send({
        status: "NOT FOUND",
        message: "Pomar nao encontrado!"
      })
    }
    res.status(200).send({ status: "OK", data: foundFarmland });
  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED", data: { error: error?.error || error }
    })
  }
}

// update an already-registered farmland
const updateFarmland = async (req, res) => {
  const farmlandId = req.params.farmlandId;
  const { label, geocoordinates } = req.body;

  try {
    let farmland = await Farmland.findOneAndUpdate(
      { _id: ObjectId(farmlandId) },
      { label, geocoordinates },
      { runValidators: true, new: true }
    );

    return res.status(200).json(farmland);
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

// delete a registered farmland
const deleteFarmland = async (req, res) => {
  const farmlandId = req.params.farmlandId;
  try {
    let farmland = await Farmland.deleteOne({ _id: ObjectId(farmlandId) });
    return res.status(200).json({
      message: "Pomar eliminado com sucesso!",
    });
  } catch (err) {
    return res.status(404).json({
      message: err.message,
    });
  }
};

export default {
  addFarmlandByFarmerId,
  getFarmlandsByFarmerId,
  getOneFarmlandByFarmerId,
  // getFarmlandById,
  getFarmlands,
  updateFarmland,
  deleteFarmland,
};
