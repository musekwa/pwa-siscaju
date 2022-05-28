import _ from "lodash";
import mongoose from "mongoose";
import {
  inspectDivision,
  getMonitoringService,
  getMonitoringByYearService,
  getMonitoringByVariabilityService,
  getMonitoringByVariablityAndYearService,
} from "../services/monitoring.services.js";
import asyncHandler from "express-async-handler";

const ObjectId = mongoose.Types.ObjectId;

//@desc 
//@route 
//@access
const addMonitoringByVariability = asyncHandler (async (req, res) => {
  const { body, query, user, } = req;

  if (!query.divisionId || !query.variable) {
    res.status(400);
    throw new Error("Indique 'divisionId' e 'variable'!");
  }
  // try {
    let savedInspection = await inspectDivision(user.id, query, body);
    return res.status(201).json({ status: "OK", data: savedInspection });
  // } catch (error) {
  //   res.status(error?.status || 500);
  //   throw new Error(error.message);
  // }
});

//@desc 
//@route 
//@access
const getMonitorings = asyncHandler (async (req, res) => {
  const {
    query: { divisionId, variable, year },
  } = req;

  if (!divisionId) {
    res.status(400);
    throw new Error("Deve especificar 'divisionId'!");
  }

  // try {
    let monitoring;
    if (divisionId && !variable && !year) {
      monitoring = await getMonitoringService(divisionId); // ok
    } else if (divisionId && !variable && year) {
      monitoring = await getMonitoringByYearService(divisionId, year); // ok
    } else if (divisionId && variable && !year) {
      monitoring = await getMonitoringByVariabilityService(
        divisionId,
        variable
      ); // ok
    } else if (divisionId && variable && year) {
      monitoring = await getMonitoringByVariablityAndYearService(
        divisionId,
        variable,
        year
      ); // ok
    }

    return res.status(200).json({ status: "OK", data: monitoring });
  // } catch (error) {
  //   res.status(error?.status || 500);
  //   throw new Error(error.message);
  // }
});

export {
  addMonitoringByVariability,
  // getMonitoringByYear,
  getMonitorings,
  // updateMonitoring,
  // deleteMonitoring,
};
