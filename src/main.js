const express = require("express");
const app = express();
const appRoutes = require("./routes/index");

app.use(express.json());

app.use("/", appRoutes);

module.exports = { app };
