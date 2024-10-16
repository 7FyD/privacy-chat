const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const secret = process.env.CHAT_API_SECRET;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const chatHistories = {}; // in-memory store for chat histories

let PORT = 3000;

let connections = [];

app.prepare().then(() => {
  const server = createServer((req, res) => {
    if (req.method === "POST" && req.url === "/api/deleteChatHistory") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const authHeader = req.headers.authorization;

        if (!authHeader || authHeader.split(" ")[1] !== secret) {
          res.statusCode = 403;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Unauthorized request." }));

          return;
        }

        const { roomId } = JSON.parse(body);

        if (!roomId) {
          res.statusCode = 400;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Room ID is required." }));

          return;
        }

        if (req.method !== "POST" || req.url !== "/api/deleteChatHistory") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Method Not Allowed" }));

          return;
        }

        if (chatHistories[roomId]) {
          delete chatHistories[roomId];

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              success: `Chat history for room ${roomId} deleted.`,
            })
          );
        } else {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: `No chat history found for room ${roomId}.`,
            })
          );
        }
      });

      return;
    }

    handle(req, res);
  });

  const io = new Server(server);

  io.on("connection", (socket) => {
    socket.on("join room", ({ roomId, username }) => {
      socket.join(roomId);

      console.log(`User ${username} has joined room ${roomId}`);

      connections.push({
        id: socket.id,
        username: username,
        roomId: roomId,
      });

      // send the chat history for the room
      if (chatHistories[roomId]) {
        socket.emit("chat history", chatHistories[roomId]);
      } else {
        chatHistories[roomId] = [];
      }

      io.to(roomId).emit("room update", connections);
    });

    socket.on("message", ({ roomId, message }) => {
      if (chatHistories[roomId]) {
        chatHistories[roomId].push(message);
        if (chatHistories[roomId].length > 50) {
          chatHistories[roomId] = chatHistories[roomId].slice(-50);
        }
      } else {
        chatHistories[roomId] = [message];
      }

      io.to(roomId).emit("message", message);
    });

    socket.on("disconnect", () => {
      const removedConnectionIndex = connections.findIndex(
        (obj) => obj.id === socket.id
      );

      if (removedConnectionIndex !== -1) {
        const desiredRoomId = connections[removedConnectionIndex].roomId;
        connections.splice(removedConnectionIndex, 1);
        io.to(desiredRoomId).emit("room update", connections);
      }

      console.log(`user ${socket.id} disconnected`);
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
