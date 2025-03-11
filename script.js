document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded");

    // Connect to the Socket.IO server
    const socket = io();

    // Get the button element
    const button = document.getElementById("toggleButton");

    // Listen for the "updateButton" event from the server
    socket.on("updateButton", (state) => {
        console.log("Received updateButton event:", state);
        button.style.backgroundColor = state; // Update the button color
    });

    // Emit a "toggleButton" event to the server when the button is clicked
    button.addEventListener("click", () => {
        console.log("Button clicked");
        socket.emit("toggleButton");
    });
});
