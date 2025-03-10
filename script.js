// =======================
// 1️⃣ SERVER-SIDE CODE (Node.js)
// =======================

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Hello, world! Your server is running!');
});

let buttonState = "green"; // Initial state

io.on("connection", (socket) => {
    console.log("A user connected");

    // Send current button state to new user
    socket.emit("updateButton", buttonState);

    // Toggle button state
    socket.on("toggleButton", () => {
        buttonState = buttonState === "green" ? "red" : "green";
        io.emit("updateButton", buttonState); // Update all clients
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Serve static files (index.html, styles.css)
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// =======================
// 2️⃣ CLIENT-SIDE CODE (Browser JavaScript)
// =======================

// This part is sent to the client when they open index.html
const clientScript = `
document.addEventListener("DOMContentLoaded", () => {
    const socket = io();
    const button = document.getElementById("toggleButton");

    socket.on("updateButton", (state) => {
        button.style.backgroundColor = state;
    });

    button.addEventListener("click", () => {
        socket.emit("toggleButton");
    });
});
`;

// Serve the client-side JavaScript
app.get("/script.js", (req, res) => {
    res.setHeader("Content-Type", "application/javascript");
    res.send(clientScript);
});
