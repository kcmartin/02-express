"use strict";

var http = require("http"),
    express = require("express"),
    socketIo = require("socket.io");

const app = express();
app.set("view engine", "jade");

// Pipeline: browser -> node -> express -> M1 -> M2 -> handler
// then back again

app.use((request, response, next) => {
    console.log("In middleware 1");
    next();
    console.log("Out of middleware 1");
});

// builtin serving of static files
app.use(express.static("./public"));

app.use((request, response, next) => {
    console.log("--- In middleware 2");
    next();
    console.log("--- Out of middleware 2");
});

app.get("/", (request, response) => {
    response.end("Hello, World! Yay!");
    console.log("In handler");
});

app.get("/home", (request, response) => {
    response.render("index", {title: "TITLE!"});
});

const server = new http.Server(app);
const io = socketIo(server);

const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
