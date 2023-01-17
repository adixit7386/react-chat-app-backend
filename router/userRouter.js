const express = require("express");
const registerController = require("../controllers/registerControllers");
const loginController = require("../controllers/loginController");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const AllUsers = require("../controllers/AllUsersControllers");
router.post("/login", loginController);
router.post("/register", registerController);
router.get("/", verifyToken, AllUsers);

module.exports = router;
