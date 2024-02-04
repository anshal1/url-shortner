const usermodel = require("../modles/user.model");
const jwt = require("jsonwebtoken");
const TryCatch = require("../utils/TryCatch");
const ApiError = require("../utils/ApiError");
const status = require("http-status");

const authUser = (showpassword = false) =>
  TryCatch(async (req, res, next) => {
    const token = req.header("token");
    if (!token) {
      throw new ApiError("Unauthorized user", status.UNAUTHORIZED);
    }
    const { token: id, _ } = jwt.decode(token, process.env.SECRET);
    const user = await usermodel
      .findById(id)
      .select(showpassword ? "-email" : "-password -email");
    if (!user) {
      throw new ApiError("User not found", status.NOT_FOUND);
    }
    req.user = user;
    next();
  });

module.exports = authUser;
