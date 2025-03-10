// Client-side JavaScript (script.js)

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Connect to the server via Socket.IO
    const socket = io();
    const button = document.getElementById("toggleButton");

    // Listen for button state updates from the server
    socket.on("updateButton", (state) => {
        // Update the button's background color based on the state
        button.style.backgroundColor = state;
    });

    // Add event listener to handle button click
    button.addEventListener("click", () => {
        // Emit an event to the server to toggle the button state
        socket.emit("toggleButton");
    });
});
