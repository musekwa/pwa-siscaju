import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
// import expressValidator from "express-validator";
import userRoutes from "./routes/user.routes.js";
import farmerRoutes from "./routes/farmer.routes.js";
import farmlandRoutes from "./routes/farmland.routes.js";
import farmDivisionRoutes from "./routes/farmDivision.routes.js";
import monitoringRoutes from "./routes/monitoring.routes.js";
import dbConnection from "../config/db.js";

const { connect, disconnect } = dbConnection;

const app = express();

// MongoDB connection
connect();

app.use(express.static("public"));
app.use(express.json()); // app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());

// Protection using helmet
// app.use(helmet.hidePoweredBy())
// app.use(helmet.frameguard({ action: "deny" }));
// app.use(helmet.xssFilter());
// app.use(helmet.noSniff());

app.use(cors());

export {
  app,
  userRoutes,
  farmerRoutes,
  farmDivisionRoutes,
  farmlandRoutes,
  monitoringRoutes,
};
