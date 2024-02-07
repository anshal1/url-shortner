const express = require("express");
const app = express();
const cors = require("cors");
const appRoutes = require("./routes/index");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use("/", appRoutes);

module.exports = { app };
