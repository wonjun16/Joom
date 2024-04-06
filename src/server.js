<<<<<<< HEAD
const express = require('express');
=======
import express from "express";
import http from "http";
import Websocket from "ws";
>>>>>>> 0eba26276d2ddc32b52a5cc50736de078579c6bb

const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
const server = http.createServer(app);
const wss = new Websocket.Server({server});

wss.on("connection", (socket) => {
    console.log("Connect with the Brower ✔");
    socket.send("hello");
    socket.on("message", (message) => {
        console.log(message);
    });
    socket.on("close", () => {
        console.log("Disconnected from the Browser ✖")
    })
});

server.listen(3000, handleListen);