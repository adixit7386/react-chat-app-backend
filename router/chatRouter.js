const express = require("express");
const accessChat = require("../controllers/AccessChatControllers");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/", verifyToken, accessChat);
// router.get("/", verifyToken, accessChat);
// router.get("/", verifyToken, fetchChat);
// router.post("/group", verifyToken, createGroupChat);
// router.put("/rename", verifyToken, renameGroup);
// router.put("/groupremove", verifyToken, removeFromGroup);
// router.put("/groupadd", verifyToken, addToGroup);
module.exports = router;
