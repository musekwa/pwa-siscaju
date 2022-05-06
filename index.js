import config from "./config/config.js";
import server from "./server/server.js";
const {
  app,
  userRoutes,
  farmerRoutes,
  farmlandRoutes,
  farmDivisionRoutes,
  monitoringRoutes,
} = server;

app.use(userRoutes);
app.use(farmerRoutes);
app.use(farmlandRoutes);
// app.use(farmDivisionRoutes);
app.use(monitoringRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${config.port}`);
});

export default app;
