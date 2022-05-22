import mongoose from "mongoose";
import Monitoring from "../models/monitoring.model.js";
import Division from "../models/division.model.js";
import Disease from "../models/disease.model.js";
import Plague from "../models/plague.model.js";
import Pruning from "../models/pruning.model.js";
import Weeding from "../models/weeding.model.js";
import Insecticide from "../models/insecticide.model.js";
import Fungicide from "../models/fungicide.model.js";
import Harvest from "../models/harvest.model.js";
import { registerMonitoringService } from "./performance.services.js";

const ObjectId = mongoose.Types.ObjectId;

// register the current state of the cashew trees in terms of:
// the following query values: 'disease'; 'plague', 'pruning'
// 'weeding', 'insecticide applied', 'fungicide applied', and
// 'harvest' in the current year.
const inspectDivision = async (userId, query, body) => {
  let division = await Division.findById(ObjectId(query.divisionId));
  if (!division) {
    throw {
      status: 404,
      message: "Subvisao nao encontrada!",
    };
  }
  let currentYear = Number(new Date().getFullYear());

  let monitoring = await Monitoring.findOneAndUpdate(
    { year: currentYear, division: division._id },
    {},
    { new: true, upsert: true, onInserDefault: true }
  );

  let savedInspection;
  switch (query.variable) {
    case "disease": // for query value = disease
      let newDisease = new Disease(body);
      savedInspection = await inspectDisease(division, monitoring, newDisease);
      break;
    case "plague": // for query value = plague
      let newPlague = new Plague(body);
      savedInspection = await inspectPlague(division, monitoring, newPlague);
      break;
    case "pruning": // for query value = pruning
      let newPruning = new Pruning(body);
      savedInspection = await inspectPruning(division, monitoring, newPruning);
      break;
    case "weeding": // for query value = weeding
      let newWeeding = new Weeding(body);
      savedInspection = await inspectWeeding(division, monitoring, newWeeding);
      break;
    case "insecticide": // for query value = insecticide
      let newInsecticide = new Insecticide(body);
      savedInspection = await inspectInsecticide(
        division,
        monitoring,
        newInsecticide
      );
      break;
    case "fungicide": // for query value = fungicide
      let newFungicide = new Fungicide(body);
      savedInspection = await inspectFungicide(
        division,
        monitoring,
        newFungicide
      );
      break;
    case "harvest": // for query value = harvest
      let newHarvest = new Harvest(body);
      savedInspection = await inspectHarvest(division, monitoring, newHarvest);
      break;
    default:
      throw {
        status: 400,
        message: "Deve especificar o valor de 'inspect'",
      };
  }
  // register user performance
  await registerMonitoringService(userId, division._id, query.variable);
  return savedInspection;
};

const getMonitoringService = async (divisionId) => {
  try {
    let monitoring = await Monitoring.find({
      division: ObjectId(divisionId),
    }).populate("disease plague weeding pruning insecticide fungicide harvest");
    if (!monitoring) {
      throw {
        status: 404,
        message: "Monitoria desta subdivisao nao encontrada!",
      };
    }
    return monitoring;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const getMonitoringByYearService = async (divisionId, year) => {
  try {
    let monitoring = await Monitoring.find({
      division: ObjectId(divisionId),
      year: year,
    }).populate("disease plague pruning weeding insecticide fungicide harvest");

    if (!monitoring) {
      throw {
        status: 404,
        message: "Monitoring desta subdivisao nao encontrada!",
      };
    }
    return monitoring;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const getMonitoringByVariabilityService = async (divisionId, variable) => {
  try {
    let monitoring = await Monitoring.find({
      division: ObjectId(divisionId),
    }).populate(`${variable}`);
    if (!monitoring) {
      throw {
        status: 404,
        message: "Esta variabilidade nesta subdivisao nao encontrada!",
      };
    }
    return monitoring;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const getMonitoringByVariablityAndYearService = async (
  divisionId,
  variable,
  year
) => {
  try {
    let monitoring = await Monitoring.find({
      division: ObjectId(divisionId),
      year,
    }).populate(`${variable}`);
    if (!monitoring) {
      throw {
        status: 404,
        message:
          "Esta variabilidade nesta subdivisao neste ano nao encontrada!",
      };
    }
    return monitoring;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

// register the actual state of the cashew trees in a farm division
// in terms of the disease severity in the current year
const inspectDisease = async (division, monitoring, newDisease) => {
  newDisease.division = division;
  try {
    let savedInspection = await newDisease.save();

    monitoring.disease.push(savedInspection);
    let savedMonitoring = await monitoring.save();
    return savedInspection;
  } catch (error) {
    throw {
      throw: error?.status || 500,
      message: "A doenca dos cajueiros nao foi registada",
    };
  }
};

// register the actual state of the cashew trees in a farm division
// in terms of the plague severity in the current year
const inspectPlague = async (division, monitoring, newPlague) => {
  newPlague.division = division;
  try {
    let savedInspection = await newPlague.save();

    monitoring.plague.push(savedInspection);
    let savedMonitoring = await monitoring.save();
    return savedInspection;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: "A praga dos cajueiros nao foi registada",
    };
  }
};

// register the actual state of the cashew trees in a farm division
// in terms of the pruning activities in the current year
const inspectPruning = async (division, monitoring, newPruning) => {
  newPruning.division = division;
  try {
    let savedInspection = await newPruning.save();

    monitoring.pruning.push(savedInspection);
    let savedMonitoring = await monitoring.save();
    return savedInspection;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: "A poda dos cajueiros nao foi registada",
    };
  }
};

// register the actual state of the cashew trees in a farm division
// in terms of the weeding activities in the current year
const inspectWeeding = async (division, monitoring, newWeeding) => {
  newWeeding.division = division;
  try {
    let savedInspection = await newWeeding.save();
    monitoring.weeding.push(savedInspection);
    let savedMonitoring = await monitoring.save();
    return savedInspection;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: "A sacha dos cajueiros nao foi registada",
    };
  }
};

// register the actual state of the cashew trees in a farm division
// in terms of the insecticide application in the current year
const inspectInsecticide = async (division, monitoring, newInsecticide) => {
  newInsecticide.division = division;
  try {
    let savedInspection = await newInsecticide.save();
    monitoring.insecticide.push(savedInspection);
    let savedMonitoring = await monitoring.save();
    return savedInspection;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: "A insecticide dos cajueiros nao foi registada",
    };
  }
};

// register the actual state of the cashew trees in a farm division
// in terms of the fungicide application in the current year
const inspectFungicide = async (division, monitoring, newFungicide) => {
  newFungicide.division = division;
  try {
    let savedInspection = await newFungicide.save();
    monitoring.fungicide.push(savedInspection);
    let savedMonitoring = await monitoring.save();
    return savedInspection;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: "A fungicida dos cajueiros nao foi registada",
    };
  }
};

// register the actual state of the cashew trees in a farm division
// in terms of the harvest activities in the current year
const inspectHarvest = async (division, monitoring, newHarvest) => {
  newHarvest.division = division;
  try {
    let savedInspection = await newHarvest.save();
    monitoring.harvest.push(savedInspection);
    let savedMonitoring = await monitoring.save();
    return savedInspection;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: "A colheita dos cajueiros nao foi registada",
    };
  }
};
export {
  inspectDivision,
  getMonitoringService,
  getMonitoringByYearService,
  getMonitoringByVariabilityService,
  getMonitoringByVariablityAndYearService,
};
