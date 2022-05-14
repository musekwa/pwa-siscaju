import config from "./config/config.js";
import {
  app,
  userRoutes,
  farmerRoutes,
  farmlandRoutes,
  farmDivisionRoutes,
  monitoringRoutes,
}  from "./server/server.js";

app.use(userRoutes);
app.use(farmerRoutes);
app.use(farmlandRoutes);
app.use(farmDivisionRoutes);
app.use(monitoringRoutes);

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${config.port}`);
});

export default app;
