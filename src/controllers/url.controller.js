const urlModel = require("../modles/urlData.model");
const TryCatch = require("../utils/TryCatch");
const ApiError = require("../utils/ApiError");

const CreateNewShortUrl = TryCatch(async (req, res) => {
  const user = req.user;
  res.json(user);
});

module.exports = { CreateNewShortUrl };
