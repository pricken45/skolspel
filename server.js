const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.json())

app.use(express.static("public"));

let activeUsers = 0;


io.on('connection', (socket) => {
    console.log("User logged in.");
    activeUsers++;
    io.emit("userCount", activeUsers-1);

    socket.on("correct", ()=> {
        io.emit("correct")
    })

    socket.on("wrong", ()=> {
        io.emit("wrong")
    })

    socket.on("disconnect", ()=> {
        activeUsers--;
        io.emit("userCount", activeUsers-1);

    })
});

server.listen(process.env.PORT, ()=>{
    console.log("Server started at port 3000");
})