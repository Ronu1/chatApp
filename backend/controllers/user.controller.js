const mongoose = require("mongoose");
const USER = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../env");
const asyncHandler = require("express-async-handler");

exports.allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await USER.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

exports.signup = async (req, res) => {
  const { name, email, password, profilePic } = req.body;
  if (!name || !email || !password) {
    res.status(402).json({ error: "Please add all the fields" });
  }

  if (!profilePic) {
    profilePic = "https://bootdey.com/img/Content/avatar/avatar1.png";
  }

  await USER.findOne({ email: email }).then((savedUser) => {
    if (savedUser) {
      return res
        .status(422)
        .json({ error: "User already exists with that email" });
    }
    bcrypt.hash(password, 12).then(async (hashedPassword) => {
      
      const user = new USER({
        name,
        email,
        password: hashedPassword,
        pic: profilePic,
      });
      user
      .save()
      .then(() => {
          const token = jwt.sign({ _id: user._id }, Jwt_secret);
          res.json({ savedUser: user, token: token, message: "saved Successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(402).json({ error: "Please add all the fields" });
  }
  USER.findOne({ $or: [{ email: email }] }).then((savedUser) => {
    if (!savedUser) {
      return res.status(422).json({ error: "Invalid Email" });
    }

    bcrypt
      .compare(password, savedUser.password)
      .then(async (match) => {
        if (match) {
          const token = jwt.sign({ _id: savedUser.id }, Jwt_secret);
          return res.json({ token: token, savedUser: savedUser });
        } else {
          return res.status(422).json({ error: "Invalid Password" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
