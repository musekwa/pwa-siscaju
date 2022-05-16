import _ from "lodash";
import mongoose from "mongoose";
import {
  inspectDivision,
  getMonitoringService,
  getMonitoringByYearService,
  getMonitoringByVariabilityService,
  getMonitoringByVariablityAndYearService,
} from "../services/monitoring.services.js";

const ObjectId = mongoose.Types.ObjectId;

// register a new monitoring for a farm division
const addMonitoringByVariability = async (req, res) => {
  const { body, query } = req;

  if (!query.divisionId || !query.variable) {
    res.status(400).send({
      status: "FAILED",
      message: "Indique 'divisionId' e 'variable'!",
    });
  }
  try {
    let savedInspection = await inspectDivision(query, body);
    res.status(200).send({ status: "OK", data: savedInspection });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.error || error } });
  }
};

const getMonitorings = async (req, res)=>{

  const {
    query: { divisionId, variable, year}
  } = req;

  if (!divisionId){
    res.status(400).send({ status: "FAILED", message: "Deve especificar 'divisionId'!" })
  }

  try {
    let monitoring;
    if (divisionId && !variable && !year){
      monitoring = await getMonitoringService(divisionId); // ok
    }
    else if (divisionId && !variable && year){
      monitoring = await getMonitoringByYearService(divisionId, year); // ok
    }
    else if (divisionId && variable && !year){
      monitoring = await getMonitoringByVariabilityService(divisionId, variable); // ok
    }
    else if (divisionId && variable && year){
      monitoring = await getMonitoringByVariablityAndYearService(divisionId, variable, year); // ok
    }

    res.status(200).send({ status: "OK", data: monitoring })

  } catch (error) {
    res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
}

// get the monitoring report of a farm division by year
// const getMonitoringByYear = async (req, res) => {
//   const {
//     query: { divisionId, year },
//   } = req;

//   if (!divisionId || !year) {
//     res.status(400).send({
//       status: "FAILED",
//       message: "Deve especificar 'divisionId' e 'year'!",
//     });
//   }

//   try {
//     let monitoring = await getMonitoringByYearService(divisionId, year);
//     res.status(200).send({ status: "OK", data: monitoring });
//   } catch (error) {
//     res.status(error?.status || 500).send({
//       status: "FAILED",
//       data: { error: error?.error || error },
//     });
//   }
// };

// get all yearly farmland's division state
// const getMonitoringByDivision = async (req, res) => {
//   const {
//     query: { divisionId },
//   } = req;

//   if (!divisionId) {
//     res.status(400).send({
//       status: "FAILED",
//       message: "Deve especificar 'divisionId'!",
//     });
//   }
//   try {
//     let monitoring = await getMonitoringByDivisionService(divisionId);
//     return res.status(200).send({ status: "OK", data: monitoring });
//   } catch (error) {
//     return res
//       .status(error?.status || 500)
//       .send({ status: "FAILED", data: { error: error?.error || error } });
//   }
// };

// delete a registered farmland
// const deleteMonitoring = async (req, res) => {
  // const monitoringId = req.params.monitoringId;
  // try {
  //   let monitoring = await Monitoring.deleteOne({
  //     _id: ObjectId(monitoringId),
  //   });
  //   return res.status(200).json({
  //     message: "A monitoria foi eliminada com sucesso",
  //   });
  // } catch (err) {
  //   return res.status(404).json({
  //     message: err.message,
  //   });
  // }
// };

export {
  addMonitoringByVariability,
  // getMonitoringByYear,
  getMonitorings,
  // updateMonitoring,
  // deleteMonitoring,
};
