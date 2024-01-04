const express = require("express");
const mongoose = require("mongoose");
const {mongoUrl} = require("./env");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json())
require('./models/userModel')
require('./models/chatModel')
require("./models/messageModel");
app.use("/chat", require("./routes/chatRoute"));
app.use("/user",require('./routes/userRoute'))
app.use("/message", require("./routes/messageRoute"));
mongoose.connect(mongoUrl);

mongoose.connection.on("connected",()=>{
console.log("successfully connected to database")
})

mongoose.connection.on("error", () => {
  console.log("not connected to database");
});

const server = app.listen(5000, () => {
  console.log("server is connected to port " + 5000);
});

module.exports = server;

// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:5173",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Connected to socket.io");
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });
//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     var chat = newMessageRecieved.chat;

//     if (!chat.users) return console.log("chat.users not defined");

//     chat.users.forEach((user) => {
//       if (user._id == newMessageRecieved.sender._id) return;

//       socket.in(user._id).emit("message recieved", newMessageRecieved);
//     });
//   });

//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   });
// });