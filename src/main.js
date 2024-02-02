const express = require("express");
const app = express();
const appRoutes = require("./routes/index");
const logger = require("./utils/logger");

app.use(express.json());

app.use("/", appRoutes);

app.use((err, req, res, next) => {
  res.status(err?.status).json({ error: err?.message });
  logger(req, res);
  next();
});

module.exports = { app };
