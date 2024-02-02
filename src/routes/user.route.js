const { Router } = require("express");
const userController = require("../controllers/user.controller");

const router = Router();

router.route("/").post(userController.CreateUser);

module.exports = router;
