const router = require("express").Router();
const viewController = require("./../controller/viewController");

router.route("/kassa").get(viewController.open_kassa);
router.route("/save_data").post(viewController.save_data_kassa);

module.exports = router;
