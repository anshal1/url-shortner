const logger = require("../utils/logger");
const TryCatch = (fn) => (req, res, next) => {
  try {
    Promise.resolve(fn(req, res, next))
      .then(() => {
        // Log success status code if no error occurred
        logger(req, res, false, "");
      })
      .catch((err) => {
        // Log error status code if an error occurred
        logger(req, null, err?.status, true, err?.message);
        // Send the error as response
        res
          .status(err.status || 500)
          .json({ error: err.message || "Internal Server Error" });
      });
  } catch (err) {
    // Catch synchronous errors
    logger(req, null, err?.status, true, err?.message);
    res
      .status(err.status || 500)
      .json({ error: err.message || "Internal Server Error" });
  }
};
module.exports = TryCatch;
