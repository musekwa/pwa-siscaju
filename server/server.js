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
import divisionRoutes from "./routes/division.routes.js";
import monitoringRoutes from "./routes/monitoring.routes.js";
import dbConnection from "../config/db.js";
import { errorHandler} from './middleware/errorMiddleware.js'
import path from 'path'
import { fileURLToPath } from "url";
import config from "../config/config.js";

const { connect, disconnect } = dbConnection;

const app = express();

// MongoDB connection
connect();

// app.use(express.static("public"));
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// serve frontend
if (config.env === 'production'){
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res)=>res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html')))
}
else {
  app.get('/', (req, res)=>res.send('Please set to production'))
}

export {
  app,
  userRoutes,
  farmerRoutes,
  divisionRoutes,
  farmlandRoutes,
  monitoringRoutes,
  errorHandler
};
