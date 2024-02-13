const { Router } = require("express");
const authUser = require("../middlewares/userAuth");
const urlController = require("../controllers/url.controller");
const router = Router();

router
  .route("/")
  .post(authUser(), urlController.CreateNewShortUrl)
  .get(authUser(), urlController.getPaginatedUrl);
router
  .route("/short/:short_url_id")
  .get(urlController.navigateToUrlFromShortUrl);

module.exports = router;
