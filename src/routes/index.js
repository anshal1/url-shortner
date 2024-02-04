const { Router } = require("express");

const userRoute = require("./user.route");
const urlRoute = require("./url.route");

const router = Router();

const routes = [
  { route: userRoute, path: "/user" },
  { route: urlRoute, path: "/url" },
];

routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
