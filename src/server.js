import express from "express";
import http from "http";
import Websocket from "ws";

const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
const server = http.createServer(app);
const wss = new Websocket.Server({server});

const sockets = [];

wss.on("connection", (socket) => {
    console.log("Connect with the Brower ✔");
    sockets.push(socket);
    socket.on("message", (message) => {
        sockets.forEach((soc) => {soc.send(message)});
    });
    socket.on("close", () => {
        console.log("Disconnected from the Browser ✖")
    })
});

server.listen(3000, handleListen);