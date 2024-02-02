const logger = require("./logger");

const TryCatch = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch((err) => {
      next(err);
    })
    .finally(() => {
      logger(req, res);
    });
};
module.exports = TryCatch;
