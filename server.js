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
