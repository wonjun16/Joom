const SocketForm = document.querySelector("form");
const SocketUl = document.querySelector("ul");

const socket = new WebSocket(`ws://${window.location.host}`);

SocketForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = SocketForm.querySelector('input');
    socket.send(input.value);
    input.value = "";
});

socket.addEventListener("message", (message) => {
    console.log("New Message : " + message.data);
});

socket.addEventListener("close", () => {
    console.log("Disconnected from the server ✖");
});