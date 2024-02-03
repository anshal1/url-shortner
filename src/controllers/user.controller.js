const userModel = require("../modles/user.model");
const ApiError = require("../utils/ApiError");
const TryCatch = require("../utils/TryCatch");
const status = require("http-status");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  const createUser = await userModel.create({ ...req.body, password: hash });
  const token = jwt.sign({ token: createUser?._id }, process.env.SECRET);
  res.status(status.CREATED).json({ token });
});

const Login = TryCatch(async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw new ApiError("Request body not provided", status.BAD_REQUEST);
  }
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError("Email and Password are rquired", status.BAD_REQUEST);
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new ApiError("User not found", status.NOT_FOUND);
  }
  const comaparepass = bcrypt.compareSync(password, user?.password);
  if (!comaparepass) {
    throw new ApiError("Invalid username or password", status.UNAUTHORIZED);
  }
  const token = jwt.sign({ token: user._id }, process.env.SECRET);
  res.status(status.OK).json({ token });
});

module.exports = { CreateUser, Login };
