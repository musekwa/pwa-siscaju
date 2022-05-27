import config from "./config/config.js";
import { errorLogger, errorHandler, invalidPathHandler } from "./server/middleware/errorMiddleware.js";
import {
  app,
  userRoutes,
  farmerRoutes,
  farmlandRoutes,
  divisionRoutes,
  monitoringRoutes,
} from "./server/server.js";


app.use(userRoutes);
app.use(farmerRoutes);
app.use(farmlandRoutes);
app.use(divisionRoutes);
app.use(monitoringRoutes);

app.use(errorHandler);
app.use(errorLogger);
app.use(invalidPathHandler)

// app.get("/", (req, res) => {
//   res.sendFile("index.html");
// });

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${config.port}`);
});

export default app;
