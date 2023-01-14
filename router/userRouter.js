const express = require("express");
const registerController = require("../controllers/registerControllers");
const loginController = require("../controllers/loginController");
const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;
