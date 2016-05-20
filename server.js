"use strict";

var http = require("http"),
    express = require("express"),
    socketIo = require("socket.io");

const app = express();
app.set("view engine", "jade");

// Pipeline: browser -> node -> express -> M1 -> M2 -> handler
// then back again


// builtin serving of static files
app.use(express.static("./public"));

app.get("/", (request, response) => {
    response.end("Hello, World! Yay!");
});

app.get("/home", (request, response) => {
    response.render("index", {title: "TITLE!"});
});

const server = new http.Server(app);
const io = socketIo(server);

io.on("connection", socket => {
    console.log("Client connected!");
    socket.on("chat:add", data => {
        console.log(data);
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
