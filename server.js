const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const chatHistories = {}; // in-memory store for chat histories

let PORT = 3000;

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("join room", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room ${roomId}`);

      // send the chat history for the room
      if (chatHistories[roomId]) {
        socket.emit("chat history", chatHistories[roomId]);
      } else {
        chatHistories[roomId] = [];
      }
    });

    socket.on("message", ({ roomId, message }) => {
      if (chatHistories[roomId]) {
        chatHistories[roomId].push(message);
      } else {
        chatHistories[roomId] = [message];
      }
      io.to(roomId).emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  server.on("error", (e) => {
    if (e.code === "EADDRINUSE") {
      console.error("Address already in use, retrying in a few seconds...");
      PORT = PORT + 1;
      setTimeout(() => {
        server.listen(PORT);
      }, 1000);
    }
  });

  server.listen(PORT, (err) => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
