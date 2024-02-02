const express = require("express");
const app = express();

app.use(express.json());

app.use((err, req, res, next) => {
  res.status(err?.status).json({ error: err?.message });
  next();
});

module.exports = { app };
