const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let buttonState = "green"; // Initial button state

// Serve static files like your index.html
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Listen for connections from clients
io.on("connection", (socket) => {
    console.log("A user connected");

    // Send current button state to the newly connected client
    socket.emit("updateButton", buttonState);

    // Listen for button toggle from any client
    socket.on("toggleButton", () => {
        buttonState = buttonState === "green" ? "red" : "green"; // Toggle state
        io.emit("updateButton", buttonState); // Emit updated state to all clients
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
