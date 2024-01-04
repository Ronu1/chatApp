const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  removeFromGroup,
  addToGroup,
  renameGroup,
  deleteChat,
} = require("../controllers/chat.controller");
const { protect } = require("../middlewares/authMiddleware");
const {
  accessChatValidation,
  validate,
  fetchChatsValidation,
  deleteChatValidation,
  createGroupChatValidation,
  renameGroupValidation,
  removeFromGroupValidation,
  addToGroupValidation,
} = require("../validators/chat.validator");

const router = express.Router();

router.route("/").post(protect, accessChatValidation, validate, accessChat);
router.route("/").get(protect, fetchChatsValidation, validate, fetchChats);
router
  .route("/:id")
  .delete(protect, deleteChatValidation, validate, deleteChat);
router
  .route("/group")
  .post(protect, createGroupChatValidation, validate, createGroupChat);
router
  .route("/rename")
  .put(protect, renameGroupValidation, validate, renameGroup);
router
  .route("/groupremove")
  .put(protect, removeFromGroupValidation, validate, removeFromGroup);
router
  .route("/groupadd")
  .put(protect, addToGroupValidation, validate, addToGroup);
module.exports = router;
