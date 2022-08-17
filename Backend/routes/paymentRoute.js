const router = require("express").Router();
const paymeController = require("./../controller/paymeController");
router.route("/").post(paymeController.handler);

module.exports = router;
