const express = require("express");
const router = express.Router();
const  {protect}  = require("../middlewares/authMiddleware");
const {allUsers, signup, login } = require("../controllers/user.controller");


router.get("/",protect, allUsers);
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
