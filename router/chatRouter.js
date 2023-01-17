const express = require("express");
const accessChat = require("../controllers/AccessChatControllers");
const fetchChat = require("../controllers/FetchChatControllers");
const createGroupChat = require("../controllers/CreateGroupChatControllers");
const verifyToken = require("../middleware/verifyToken");
const renameGroup = require("../controllers/RenameGroupControllers");
const router = express.Router();

router.post("/", verifyToken, accessChat);
router.get("/", verifyToken, fetchChat);

router.post("/group", verifyToken, createGroupChat);
router.put("/rename", verifyToken, renameGroup);
// router.put("/groupremove", verifyToken, removeFromGroup);
// router.put("/groupadd", verifyToken, addToGroup);
module.exports = router;
