const { body, param, validationResult } = require("express-validator");

const accessChatValidation = [
  body("userId").notEmpty().withMessage("User ID is required"),
];

const fetchChatsValidation = [];

const deleteChatValidation = [
  param("id").notEmpty().withMessage("Chat ID is required"),
];

const createGroupChatValidation = [
  body("users")
    .isArray({ min: 2 })
    .withMessage("At least 2 users are required to form a group chat"),
  body("name").notEmpty().withMessage("Group chat name is required"),
];

const renameGroupValidation = [
  body("chatId").notEmpty().withMessage("Chat ID is required"),
  body("chatName").notEmpty().withMessage("New chat name is required"),
];

const removeFromGroupValidation = [
  body("chatId").notEmpty().withMessage("Chat ID is required"),
  body("userId").notEmpty().withMessage("User ID is required"),
];

const addToGroupValidation = [
  body("chatId").notEmpty().withMessage("Chat ID is required"),
  body("userId").notEmpty().withMessage("User ID is required"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({ errors: errors.array() });
};

module.exports = {
  accessChatValidation,
  fetchChatsValidation,
  deleteChatValidation,
  createGroupChatValidation,
  renameGroupValidation,
  removeFromGroupValidation,
  addToGroupValidation,
  validate,
};
