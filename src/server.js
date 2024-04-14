import express from "express";
import http from "http";
import socktio from "socket.io";

const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
const server = http.createServer(app);
const io = socktio(server);

io.on('connection', (socket) => {
    socket.on("enter_room", (roomname) => {
        socket.join(roomname);
        socket.to('')
    });
});


//const wss = new Websocket.Server({server});
// const sockets = [];

// wss.on("connection", (socket) => {
//     console.log("Connect with the Brower ✔");
//     socket["nickname"] = "Anon";
//     sockets.push(socket);
//     socket.on("message", (message) => {
//         const msg = JSON.parse(message);
//         switch(msg.type){
//             case "nickname":
//                 socket["nickname"] = msg.data;
//                 break;
//             case "message":
//                 sockets.forEach((soc) => {
//                     soc.send(`${socket.nickname} : ${msg.data}`);
//                 });
//                 break;
//         }
//     });
//     socket.on("close", () => {
//         console.log("Disconnected from the Browser ✖")
//     })
// });

server.listen(3000, handleListen);