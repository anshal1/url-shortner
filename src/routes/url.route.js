const { Router } = require("express");
const authUser = require("../middlewares/userAuth");
const urlController = require("../controllers/url.controller");
const router = Router();

router.route("/").post(authUser(), urlController.CreateNewShortUrl);

module.exports = router;
