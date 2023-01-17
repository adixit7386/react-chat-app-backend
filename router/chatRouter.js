const express = require("express");
const accessChat = require("../controllers/AccessChatControllers");
const fetchChat = require("../controllers/FetchChatControllers");
const createGroupChat = require("../controllers/CreateGroupChatControllers");
const addToGroup = require("../controllers/AddToGroupControllers");
const verifyToken = require("../middleware/verifyToken");
const renameGroup = require("../controllers/RenameGroupControllers");
const removeFromGroup = require("../controllers/RemoveFromGroupControllers");
const router = express.Router();

router.post("/", verifyToken, accessChat);
router.get("/", verifyToken, fetchChat);

router.post("/group", verifyToken, createGroupChat);
router.put("/rename", verifyToken, renameGroup);
router.put("/groupadd", verifyToken, addToGroup);
router.put("/groupremove", verifyToken, removeFromGroup);
module.exports = router;
