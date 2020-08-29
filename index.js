// Dependencies
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// User lands on the site
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// User connected
io.on("connection", (socket) => {
  console.log("a user connected");

  // User chatted
  socket.on("chat message", (msg) => {
    // Broadcast to the other users
    socket.broadcast.emit("chat message", msg);
  });

  // User changed their name
  socket.on("name change", (username) => {
    // Broadcast to the other users
    socket.broadcast.emit("name change", username);
  });

  // User disconnected
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Server started
http.listen(3000, () => {
  console.log("listening on *:3000");
});
