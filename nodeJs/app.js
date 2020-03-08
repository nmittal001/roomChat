const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = 4001;

const app = express();

// Server instance
const server = http.createServer(app);

// Creates socket using instance of the server
const io = socketIO(server);
rooms = {
  room1: { users: {} },
  room2: { users: {} },
  room3: { users: {} }
};
app.use(express.urlencoded({ extended: true }));
io.on("connection", socket => {
  console.log(`Socket ${socket.id} connected.`);

  socket.on("joinNewUser", (room, name) => {
    socket.join(room);
    console.log("room, name-->>", room, name);
  });

  socket.on("message", (room, message) => {
    io.sockets.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
