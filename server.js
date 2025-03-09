const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins (for testing)
    },
});

let buttonState = "green"; // Initial state

io.on("connection", (socket) => {
    console.log("A user connected");

    // Send the current state to the new user
    socket.emit("updateButton", buttonState);

    // Listen for button clicks
    socket.on("toggleButton", () => {
        buttonState = buttonState === "green" ? "red" : "green";
        io.emit("updateButton", buttonState); // Broadcast to all clients
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
