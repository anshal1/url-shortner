const userModel = require("../modles/user.model");
const ApiError = require("../utils/ApiError");
const TryCatch = require("../utils/TryCatch");
const status = require("http-status");

const CreateUser = TryCatch(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new ApiError("Data Not Provided", status.BAD_REQUEST);
  }
  for (let key in req.body) {
    if (!req.body[key]) {
      throw new ApiError(`${key} is required`, status.BAD_REQUEST);
    }
  }
  const { email } = req.body;
  const isUserExist = await userModel.exists({ email });
  if (isUserExist) {
    throw new ApiError("User Already Exists", status.CONFLICT);
  }
  const createUser = await userModel.create(req.body);
  res.json(createUser);
});

module.exports = { CreateUser };
