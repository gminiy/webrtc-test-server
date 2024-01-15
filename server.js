const app = require("express")();
const { Server } = require("socket.io");

async function server() {
  const http = require("http").createServer(app);
  const io = new Server(http, { transports: ["websocket"] });
  const roomName = "temp";
  io.on("connection", (socket) => {
    socket.on("join", () => {
      socket.join(roomName);
      socket.to(roomName).emit("joined");
      console.log("joined");
    });
    socket.on("offer", (offer) => {
      socket.to(roomName).emit("offer", offer);
      console.log("offer");
    });
    socket.on("answer", (answer) => {
      socket.to(roomName).emit("answer", answer);
      console.log(answer);
    });
    socket.on("ice", (ice) => {
      socket.to(roomName).emit("ice", ice);
      console.log("ice");
    });
  });
  http.listen(3000, () => console.log("server open !!"));
}

server();
