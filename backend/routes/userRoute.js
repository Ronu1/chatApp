const express = require("express");
const router = express.Router();
const  {protect}  = require("../middlewares/authMiddleware");
const {allUsers, signup, login } = require("../controllers/user.controller");
const { signupValidation, validate, loginValidation } = require("../validators/user.validator");


router.get("/",protect, allUsers);
router.post("/signup",signupValidation,validate, signup);
router.post("/login", loginValidation, validate, login);

module.exports = router;
