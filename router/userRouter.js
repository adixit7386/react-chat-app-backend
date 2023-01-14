const express = require("express");
const registerController = require("../controllers/registerControllers");
const router = express.Router();

// router.post("/login", userLogin);
router.post("/register", registerController);

module.exports = router;
