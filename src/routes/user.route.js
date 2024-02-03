const { Router } = require("express");
const userController = require("../controllers/user.controller");

const router = Router();

router.route("/register").post(userController.CreateUser);
router.route("/login").post(userController.Login);

module.exports = router;
