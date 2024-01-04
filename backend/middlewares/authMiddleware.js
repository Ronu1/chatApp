const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const { Jwt_secret } = require("../env");


const protect = asyncHandler(async (req, res, next) => {
 const { authorization } = req.headers;
 if (!authorization) {
   return res.status(401).json({ error: "You must have logged in 1" });
 }
 const token = authorization.replace("Bearer ", "");
 jwt.verify(token, Jwt_secret, (err, payload) => {
   if (err) {
     return res.status(401).json({ error: "You must have logged in 2" });
   }
   const { _id } = payload;
   User.findById(_id).then((userData) => {
     req.user = userData;
     next();
   });
 });
});

module.exports = { protect };
