const socket = io();

const nickDiv = document.getElementById("nick");
const roomDiv = document.getElementById("room");

const nickForm = nickDiv.querySelector("form");
const roomForm = roomDiv.querySelector("form");

roomForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = roomDiv.querySelector("input");
    socket.emit("enter_room", input.value, () => console.log("front callback"));

    input.value = "";
});