const router = require("express").Router();
const authController = require("./../controller/authController");

router.route("/sign_up").post(authController.sign_up);
router.route("/verify_code").post(authController.verify_code);
router.route("/register").post(authController.register);
module.exports = router;
