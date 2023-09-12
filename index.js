// //Node server which will handle WebSocket.io connections
// const io = require("socket.io")(3000, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// }); //instance of http

// const users = {};
// io.on(`connection`, (socket) => {
//   //listen incoming events and then perform the callback functions
//   //events names are custom
//   socket.on(`new-user-joined`, (user_name) => {
//     //if someting happens with prticular event
//     console.log("new user joined", user_name);
//     users[socket.id] = user_name;
//     socket.broadcast.emit(`user-joined`); //msg to every person except the one who joined
//   });

//   socket.on(`send`, (message) => {
//     socket.broadcast.emit(`receive`, {
//       message: message,
//       name: users[socket.id],
//     });
//   });
// });
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const path = require("path");
const { Socket } = require("socket.io");
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Listening  on port ${PORT}`);
});

//set path for static folders like css file
const staticPath = path.join(__dirname, "/public");
app.use(express.static(staticPath));
app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "index.html"); // Adjust the path to match your folder structure
  res.sendFile(indexPath);
});

const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});
