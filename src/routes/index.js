const { Router } = require("express");

const userRoute = require("./user.route");

const router = Router();

const routes = [{ route: userRoute, path: "/user" }];

routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
