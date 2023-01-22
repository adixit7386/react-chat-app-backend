const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();
const sendMessageController = require("../controllers/SendMessageControllers");
const fetchMessageController = require("../controllers/FetchMessageControllers");
router.post("/", verifyToken, sendMessageController);
router.get("/:chatId", verifyToken, fetchMessageController);

module.exports = router;
