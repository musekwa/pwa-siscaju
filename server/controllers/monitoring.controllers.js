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
    return res.status(400).send({
      status: "FAILED",
      message: "Indique 'divisionId' e 'variable'!",
    });
  }
  try {
    let savedInspection = await inspectDivision(query, body);
    return res.status(201).send({ status: "OK", data: savedInspection });
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.error || error } });
  }
};

const getMonitorings = async (req, res)=>{

  const {
    query: { divisionId, variable, year}
  } = req;

  if (!divisionId){
    return res.status(400).send({ status: "FAILED", message: "Deve especificar 'divisionId'!" })
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

    return res.status(200).send({ status: "OK", data: monitoring })

  } catch (error) {
    return res.status(error?.status || 500).send({
      status: "FAILED",
      data: { error: error?.error || error },
    });
  }
}

export {
  addMonitoringByVariability,
  // getMonitoringByYear,
  getMonitorings,
  // updateMonitoring,
  // deleteMonitoring,
};
